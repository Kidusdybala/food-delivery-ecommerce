import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import axios from "axios";

const MockSuccess = () => {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get('tx_ref');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!txRef) return;

      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${txRef}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [txRef]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                  Payment Successful!
                </h1>
                <p className="text-muted-foreground">
                  Your order has been confirmed and payment processed successfully.
                </p>
                {txRef && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Transaction Reference: {txRef}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {order && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Order ID:</span>
                    <p className="text-muted-foreground">{order._id || order.id}</p>
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span>
                    <p className="text-muted-foreground">{order.amount} {order.currency}</p>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <p className="text-green-600 font-medium">{order.status}</p>
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-muted-foreground">{order.user_email}</p>
                  </div>
                </div>

                {order.items && (
                  <div>
                    <h4 className="font-medium mb-2">Items Ordered:</h4>
                    <div className="space-y-2">
                      {JSON.parse(order.items).map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm p-2 bg-muted rounded">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{item.total} ETB</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Order Preparation</p>
                    <p className="text-sm text-muted-foreground">
                      Your restaurant is preparing your delicious food with care.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Quality Check</p>
                    <p className="text-sm text-muted-foreground">
                      Our team ensures everything meets our high standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium">On the Way</p>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered hot and fresh to your location.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/track" className="flex-1">
              <Button className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Order More Food
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockSuccess;