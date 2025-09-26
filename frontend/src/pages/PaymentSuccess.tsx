import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FoodHeader from "./home/FoodHeader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const tx_ref = searchParams.get('tx_ref');

  useEffect(() => {
    if (status === 'success' && tx_ref) {
      // Could fetch order details here
      console.log('Payment successful for transaction:', tx_ref);
    }
  }, [status, tx_ref]);

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {status === 'success' ? (
            <>
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                Transaction Reference: {tx_ref}
              </p>
            </>
          ) : (
            <>
              <div className="text-red-500 text-6xl mb-4">✗</div>
              <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
              <p className="text-muted-foreground mb-6">
                There was an issue processing your payment. Please try again.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;