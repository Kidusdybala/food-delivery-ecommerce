import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin, Phone, User } from "lucide-react";

const OrderTracking = () => {
  const orderSteps = [
    { id: 1, title: "Order Confirmed", completed: true, time: "2:15 PM" },
    { id: 2, title: "Restaurant Preparing", completed: true, time: "2:18 PM" },
    { id: 3, title: "Out for Delivery", completed: true, time: "2:35 PM" },
    { id: 4, title: "Delivered", completed: false, estimatedTime: "2:50 PM" }
  ];

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
                Order #12345
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                  In Transit
                </Badge>
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
                  Estimated Delivery: 2:50 PM
                </div>
                <p className="text-sm text-muted-foreground">
                  Your driver is on the way! You'll receive a notification when they arrive.
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

        {/* Live Map placeholder */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="font-medium mb-2">Live Delivery Tracking</p>
                <p className="text-sm text-muted-foreground">
                  Map integration shows real-time driver location and estimated arrival
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderTracking;