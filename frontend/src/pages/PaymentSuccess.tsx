import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FoodHeader from "./home/FoodHeader";
import axios from "axios";
import { toast } from "sonner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const status = urlParams.get('status');
  const tx_ref = urlParams.get('tx_ref');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'unknown'>('unknown');

  useEffect(() => {
    // If status is 'success', immediately set payment status to success
    if (status === 'success') {
      setPaymentStatus('success');
      setIsLoading(false);
      return;
    }

    const verifyPayment = async () => {
      if (!tx_ref) {
        setPaymentStatus('failed');
        setIsLoading(false);
        return;
      }

      try {
        // Verify payment status with backend
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/api/payment/verify?tx_ref=${tx_ref}`);

        if (response.data.status === 'success') {
          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        // If API call fails but status is success, consider it a success
        setPaymentStatus(status === 'success' ? 'success' : 'failed');
      } finally {
        setIsLoading(false);
      }
    };

    // If we have a tx_ref, verify the payment
    if (tx_ref) {
      verifyPayment();
    } else {
      setPaymentStatus('failed');
      setIsLoading(false);
    }
  }, [status, tx_ref]);

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h1 className="text-3xl font-bold mb-4">Verifying Payment</h1>
              <p className="text-muted-foreground mb-6">
                Please wait while we verify your payment status...
              </p>
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <div className="text-green-500 text-6xl mb-4">✓</div>
              <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Transaction Reference: {tx_ref || 'N/A'}
              </p>
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Return to Home
              </button>
            </>
          ) : (
            <>
              <div className="text-red-500 text-6xl mb-4">✗</div>
              <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
              <p className="text-muted-foreground mb-6">
                There was an issue processing your payment. Please try again.
              </p>
              <button 
                onClick={() => navigate('/cart')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Return to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;