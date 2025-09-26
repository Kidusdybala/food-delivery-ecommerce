import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FoodHeader from "./home/FoodHeader";
import { useCart } from "@/contexts/CartContext";
import { MapPin, Trash2, Plus, Minus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  const detectLocation = () => {
    setIsDetectingLocation(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use a reverse geocoding service to get address
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );

          const address = response.data.localityInfo?.administrative?.[2]?.name ||
                         response.data.city ||
                         `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

          setLocation({ lat: latitude, lng: longitude, address });
          toast.success(`Location detected: ${address}`);
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          setLocation({ lat: latitude, lng: longitude, address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` });
          toast.success(`Location detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }

        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error("Unable to detect location. Please check your browser permissions.");
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!location) {
      toast.error("Please detect your location first.");
      return;
    }

    if (!checkoutData.email || !checkoutData.firstName || !checkoutData.lastName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const requestData = {
      amount: getTotalPrice(),
      email: checkoutData.email,
      first_name: checkoutData.firstName,
      last_name: checkoutData.lastName,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
    };

    console.log('Sending payment request:', requestData);

    try {
      const response = await axios.post('http://localhost:8000/api/payment/initialize', requestData);

      console.log('Payment response:', response.data);

      if (response.data.status === 'success') {
        clearCart();
        window.location.href = response.data.data.checkout_url;
      }
    } catch (error: any) {
      console.error('Payment initialization failed:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Payment initialization failed. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <FoodHeader />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some delicious food to your cart and come back!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <FoodHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.price} ETB each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.price * item.quantity} ETB</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-0 h-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{item.price * item.quantity} ETB</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total: {getTotalPrice()} ETB</span>
                </div>
              </div>
            </div>

            {/* Location Detection */}
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              {!location ? (
                <Button
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="w-full"
                  variant="outline"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {isDetectingLocation ? "Detecting Location..." : "Detect My Location"}
                </Button>
              ) : (
                <div className="p-3 bg-muted rounded">
                  <p className="text-sm font-medium">📍 {location.address}</p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  type="text"
                  placeholder="First Name"
                  value={checkoutData.firstName}
                  onChange={(e) => setCheckoutData(prev => ({ ...prev, firstName: e.target.value }))}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={checkoutData.lastName}
                  onChange={(e) => setCheckoutData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={!location || !checkoutData.email || !checkoutData.firstName || !checkoutData.lastName}
              className="w-full"
              size="lg"
            >
              Pay with Chapa ({getTotalPrice()} ETB)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;