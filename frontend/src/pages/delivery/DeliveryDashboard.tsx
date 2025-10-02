import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { toast } from '../../hooks/use-toast';
import Echo from '../../echo';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  user_email: string;
  items: unknown[];
  delivery_person?: {
    name: string;
  };
}

const DeliveryDashboard: React.FC = () => {
  const { token, user } = useAuth();
  const queryClient = useQueryClient();

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const { data: assignedOrders, isLoading } = useQuery({
    queryKey: ['delivery-orders'],
    queryFn: async () => {
      const response = await fetch('/api/delivery/orders', { headers });
      if (!response.ok) throw new Error('Failed to fetch assigned orders');
      return response.json();
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await fetch(`/api/delivery/orders/${orderId}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-orders'] });
      toast({ title: 'Order status updated successfully' });
    },
  });

  const updateLocationMutation = useMutation({
    mutationFn: async () => {
      return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser.'));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error('Unable to retrieve your location.'));
          }
        );
      }).then(async (coords) => {
        const response = await fetch('/api/locations', {
          method: 'POST',
          headers,
          body: JSON.stringify(coords),
        });
        if (!response.ok) throw new Error('Failed to update location');
        return response.json();
      });
    },
    onSuccess: () => {
      toast({ title: 'Location updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error updating location', description: error.message, variant: 'destructive' });
    },
  });

  const handleStatusUpdate = (orderId: string, status: string) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  useEffect(() => {
    if (!user) return;

    // Listen for order status updates for this delivery person
    const channel = Echo.private(`delivery.${user.id}`)
      .listen('.order.status.updated', (e: { order: Order; status: { value: string } }) => {
        console.log('Order status updated for delivery person:', e);
        // Refresh the orders list
        queryClient.invalidateQueries({ queryKey: ['delivery-orders'] });
        // Show notification
        toast({
          title: 'Order Update',
          description: `Order ${e.order.order_number} status changed to ${e.status.value}`,
        });
      });

    return () => {
      Echo.leave(`delivery.${user.id}`);
    };
  }, [user, queryClient]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Delivery Dashboard</h1>

      <div className="mb-6">
        <Button
          onClick={() => updateLocationMutation.mutate()}
          disabled={updateLocationMutation.isPending}
        >
          {updateLocationMutation.isPending ? 'Updating Location...' : 'Update Location'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Assigned Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer Email</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignedOrders?.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.order_number}</TableCell>
                    <TableCell>{order.user_email}</TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {order.status === 'assigned' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'picked_up')}
                          disabled={updateStatusMutation.isPending}
                        >
                          Mark as Picked Up
                        </Button>
                      )}
                      {order.status === 'picked_up' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                          disabled={updateStatusMutation.isPending}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryDashboard;