import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const MockCheckout = () => {
  const [searchParams] = useSearchParams();
  const txRef = searchParams.get('tx_ref');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePayment = async () => {
    if (!txRef) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update order status to paid
      await axios.post('http://localhost:8000/api/payment/mock-complete', {
        tx_ref: txRef,
        status: 'success'
      });

      setIsCompleted(true);
      toast.success("Payment completed successfully!");

      // Redirect to success page after a short delay
      setTimeout(() => {
        window.location.href = `/payment/success?tx_ref=${txRef}`;
      }, 1500);

    } catch (error) {
      console.error('Mock payment failed:', error);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground">
                Your order has been confirmed and is being prepared.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Mock Payment Checkout
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">ETB 1,150</div>
            <p className="text-muted-foreground">FoodieExpress Order</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <p className="text-sm text-muted-foreground">
                Transaction Reference: {txRef}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Test Payment Methods</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      CBE
                    </div>
                    <span className="text-sm">Commercial Bank of Ethiopia</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Test</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      DB
                    </div>
                    <span className="text-sm">Dashen Bank</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Test</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Complete Payment (Test Mode)
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This is a mock payment for testing purposes. No real payment will be processed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockCheckout;