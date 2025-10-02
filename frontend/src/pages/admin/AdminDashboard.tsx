import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from '../../hooks/use-toast';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  delivery_time: number;
  delivery_fee: number;
  image?: string;
  description?: string;
}

interface Food {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  image?: string;
  description?: string;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  user_email: string;
  items: unknown[];
}

interface DeliveryPerson {
  id: string;
  name: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [restaurantForm, setRestaurantForm] = useState<Partial<Restaurant>>({});
  const [foodForm, setFoodForm] = useState<Partial<Food>>({});
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState<string>('');

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  // Restaurants
  const { data: restaurants, isLoading: restaurantsLoading } = useQuery({
    queryKey: ['admin-restaurants'],
    queryFn: async () => {
      const response = await fetch('/api/admin/restaurants', { headers });
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      return response.json();
    },
  });

  const createRestaurantMutation = useMutation({
    mutationFn: async (data: Partial<Restaurant>) => {
      const response = await fetch('/api/admin/restaurants', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create restaurant');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
      setRestaurantForm({});
      toast({ title: 'Restaurant created successfully' });
    },
  });

  const updateRestaurantMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Restaurant> }) => {
      const response = await fetch(`/api/admin/restaurants/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update restaurant');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
      setEditingRestaurant(null);
      toast({ title: 'Restaurant updated successfully' });
    },
  });

  const deleteRestaurantMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/restaurants/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw new Error('Failed to delete restaurant');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-restaurants'] });
      toast({ title: 'Restaurant deleted successfully' });
    },
  });

  // Foods
  const { data: foods, isLoading: foodsLoading } = useQuery({
    queryKey: ['admin-foods'],
    queryFn: async () => {
      const response = await fetch('/api/admin/foods', { headers });
      if (!response.ok) throw new Error('Failed to fetch foods');
      return response.json();
    },
  });

  const createFoodMutation = useMutation({
    mutationFn: async (data: Partial<Food>) => {
      const response = await fetch('/api/admin/foods', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create food');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-foods'] });
      setFoodForm({});
      toast({ title: 'Food created successfully' });
    },
  });

  const updateFoodMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Food> }) => {
      const response = await fetch(`/api/admin/foods/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update food');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-foods'] });
      setEditingFood(null);
      toast({ title: 'Food updated successfully' });
    },
  });

  const deleteFoodMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/foods/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (!response.ok) throw new Error('Failed to delete food');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-foods'] });
      toast({ title: 'Food deleted successfully' });
    },
  });

  // Orders
  const { data: pendingOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-pending-orders'],
    queryFn: async () => {
      const response = await fetch('/api/admin/orders/pending', { headers });
      if (!response.ok) throw new Error('Failed to fetch pending orders');
      return response.json();
    },
  });

  const { data: deliveryPersons } = useQuery({
    queryKey: ['admin-delivery-persons'],
    queryFn: async () => {
      const response = await fetch('/api/admin/delivery-persons', { headers });
      if (!response.ok) throw new Error('Failed to fetch delivery persons');
      return response.json();
    },
  });

  const assignOrderMutation = useMutation({
    mutationFn: async ({ orderId, deliveryPersonId }: { orderId: string; deliveryPersonId: string }) => {
      const response = await fetch(`/api/admin/orders/${orderId}/assign`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ delivery_person_id: deliveryPersonId }),
      });
      if (!response.ok) throw new Error('Failed to assign order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-orders'] });
      setSelectedOrder(null);
      setSelectedDeliveryPerson('');
      toast({ title: 'Order assigned successfully' });
    },
  });

  const handleRestaurantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRestaurant) {
      updateRestaurantMutation.mutate({ id: editingRestaurant.id, data: restaurantForm });
    } else {
      createRestaurantMutation.mutate(restaurantForm);
    }
  };

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFood) {
      updateFoodMutation.mutate({ id: editingFood.id, data: foodForm });
    } else {
      createFoodMutation.mutate(foodForm);
    }
  };

  const startEditRestaurant = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    setRestaurantForm(restaurant);
  };

  const startEditFood = (food: Food) => {
    setEditingFood(food);
    setFoodForm(food);
  };

  const cancelEdit = () => {
    setEditingRestaurant(null);
    setEditingFood(null);
    setRestaurantForm({});
    setFoodForm({});
  };

  const handleAssignOrder = () => {
    if (selectedOrder && selectedDeliveryPerson) {
      assignOrderMutation.mutate({ orderId: selectedOrder.id, deliveryPersonId: selectedDeliveryPerson });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="restaurants" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          <TabsTrigger value="foods">Foods</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants">
          <Card>
            <CardHeader>
              <CardTitle>Manage Restaurants</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4">Add Restaurant</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRestaurantSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={restaurantForm.name || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cuisine">Cuisine</Label>
                      <Input
                        id="cuisine"
                        value={restaurantForm.cuisine || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={restaurantForm.rating || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, rating: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery_time">Delivery Time (min)</Label>
                      <Input
                        id="delivery_time"
                        type="number"
                        value={restaurantForm.delivery_time || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, delivery_time: parseInt(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="delivery_fee">Delivery Fee</Label>
                      <Input
                        id="delivery_fee"
                        type="number"
                        step="0.01"
                        value={restaurantForm.delivery_fee || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, delivery_fee: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={restaurantForm.image || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={restaurantForm.description || ''}
                        onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">{editingRestaurant ? 'Update' : 'Create'}</Button>
                      {editingRestaurant && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              {restaurantsLoading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {restaurants?.map((restaurant: Restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.cuisine}</TableCell>
                        <TableCell>{restaurant.rating}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => startEditRestaurant(restaurant)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteRestaurantMutation.mutate(restaurant.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="foods">
          <Card>
            <CardHeader>
              <CardTitle>Manage Foods</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-4">Add Food</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingFood ? 'Edit Food' : 'Add Food'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleFoodSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="food-name">Name</Label>
                      <Input
                        id="food-name"
                        value={foodForm.name || ''}
                        onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="restaurant">Restaurant</Label>
                      <Input
                        id="restaurant"
                        value={foodForm.restaurant || ''}
                        onChange={(e) => setFoodForm({ ...foodForm, restaurant: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={foodForm.price || ''}
                        onChange={(e) => setFoodForm({ ...foodForm, price: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="food-image">Image URL</Label>
                      <Input
                        id="food-image"
                        value={foodForm.image || ''}
                        onChange={(e) => setFoodForm({ ...foodForm, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="food-description">Description</Label>
                      <Textarea
                        id="food-description"
                        value={foodForm.description || ''}
                        onChange={(e) => setFoodForm({ ...foodForm, description: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">{editingFood ? 'Update' : 'Create'}</Button>
                      {editingFood && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              {foodsLoading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foods?.map((food: Food) => (
                      <TableRow key={food.id}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.restaurant}</TableCell>
                        <TableCell>${food.price}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => startEditFood(food)}>Edit</Button>
                          <Button variant="destructive" size="sm" onClick={() => deleteFoodMutation.mutate(food.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Manage Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
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
                    {pendingOrders?.map((order: Order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.order_number}</TableCell>
                        <TableCell>{order.user_email}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>Assign</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Assign Order to Delivery Person</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label>Order: {order.order_number}</Label>
                                </div>
                                <div>
                                  <Label htmlFor="delivery-person">Delivery Person</Label>
                                  <Select value={selectedDeliveryPerson} onValueChange={setSelectedDeliveryPerson}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select delivery person" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {deliveryPersons?.map((person: DeliveryPerson) => (
                                        <SelectItem key={person.id} value={person.id}>
                                          {person.name} ({person.email})
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={handleAssignOrder} disabled={assignOrderMutation.isPending}>
                                    {assignOrderMutation.isPending ? 'Assigning...' : 'Assign'}
                                  </Button>
                                  <Button variant="outline" onClick={() => { setSelectedOrder(null); setSelectedDeliveryPerson(''); }}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;