import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Phone, User } from "lucide-react";
import MapComponent from "../map/MapComponent";
import { useEffect, useState } from "react";
import Echo from "@/echo";

interface OrderTrackingProps {
  orderId?: string;
}

const OrderTracking = ({ orderId = "12345" }: OrderTrackingProps) => {
  const [orderStatus, setOrderStatus] = useState("assigned");
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    // Listen for order status updates
    const channel = Echo.private(`order.${orderId}`)
      .listen('.order.status.updated', (e: { status: { value: string } }) => {
        console.log('Order status updated:', e);
        setOrderStatus(e.status.value);
        updateCurrentStep(e.status.value);
      });

    return () => {
      Echo.leave(`order.${orderId}`);
    };
  }, [orderId]);

  const updateCurrentStep = (status: string) => {
    switch (status) {
      case 'pending':
        setCurrentStep(0);
        break;
      case 'assigned':
        setCurrentStep(1);
        break;
      case 'picked_up':
        setCurrentStep(2);
        break;
      case 'delivered':
        setCurrentStep(3);
        break;
      default:
        setCurrentStep(0);
    }
  };

  const getOrderSteps = () => {
    const now = new Date();
    const baseTime = new Date(now.getTime() - 35 * 60 * 1000); // 35 minutes ago

    return [
      {
        id: 1,
        title: "Order Confirmed",
        completed: currentStep >= 0,
        time: currentStep >= 0 ? baseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
        estimatedTime: currentStep < 0 ? baseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      },
      {
        id: 2,
        title: "Restaurant Preparing",
        completed: currentStep >= 1,
        time: currentStep >= 1 ? new Date(baseTime.getTime() + 3 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
        estimatedTime: currentStep < 1 ? new Date(baseTime.getTime() + 3 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      },
      {
        id: 3,
        title: "Out for Delivery",
        completed: currentStep >= 2,
        time: currentStep >= 2 ? new Date(baseTime.getTime() + 20 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
        estimatedTime: currentStep < 2 ? new Date(baseTime.getTime() + 20 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      },
      {
        id: 4,
        title: "Delivered",
        completed: currentStep >= 3,
        time: currentStep >= 3 ? new Date(baseTime.getTime() + 35 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
        estimatedTime: currentStep < 3 ? new Date(baseTime.getTime() + 35 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
      }
    ];
  };
const orderSteps = getOrderSteps();

const getStatusBadge = () => {
  switch (orderStatus) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
    case 'assigned':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Assigned</Badge>;
    case 'picked_up':
      return <Badge variant="outline" className="bg-primary/10 text-primary border-primary">In Transit</Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
    default:
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Unknown</Badge>;
  }
};

const getEstimatedDelivery = () => {
  if (orderStatus === 'delivered') {
    return "Delivered";
  }
  const lastStep = orderSteps[orderSteps.length - 1];
  return lastStep.estimatedTime ? `Est. ${lastStep.estimatedTime}` : "Calculating...";
};

return (
  <section className="py-20 bg-muted/20">
    <div className="container max-w-4xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Track Your Order</h2>
        <p className="text-xl text-muted-foreground">
          Real-time updates on your delivery progress
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Order #{orderId}
              {getStatusBadge()}
            </CardTitle>
          </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <div className={`mt-1 ${step.completed ? 'text-accent' : 'text-muted-foreground'}`}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.completed ? step.time : `Est. ${step.estimatedTime}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-medium mb-2">
                  <Clock className="h-4 w-4" />
                  {orderStatus === 'delivered' ? 'Delivered at:' : 'Estimated Delivery:'} {getEstimatedDelivery()}
                </div>
                <p className="text-sm text-muted-foreground">
                  {orderStatus === 'delivered'
                    ? 'Your order has been successfully delivered!'
                    : 'Your driver is on the way! You\'ll receive a notification when they arrive.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Details */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Delivery Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street, Apt 4B<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>

              {/* Driver Info */}
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Your Driver</p>
                  <p className="text-sm text-muted-foreground">Mike Johnson</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Track Live
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <p className="font-medium mb-3">Order Items</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Margherita Pizza (Large)</span>
                    <span>$18.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Caesar Salad</span>
                    <span>$8.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-accent">Free</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t">
                    <span>Total</span>
                    <span>$27.98</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Map */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <MapComponent
              locations={[
                { name: "Delivery Person", coords: [-74.008, 40.715], type: 'delivery' },
                { name: "Restaurant", coords: [-74.004, 40.710], type: 'restaurant' },
                { name: "Customer Address", coords: [-74.010, 40.708], type: 'customer' }
              ]}
              center={[-74.006, 40.7128]}
              zoom={13}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderTracking;