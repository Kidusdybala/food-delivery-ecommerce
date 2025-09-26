import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, MapPin, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";

const FoodHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images-removebg-preview (1).png" alt="FoodieExpress Logo" className="w-8 h-8 rounded-lg" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            FoodieExpress
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/foods"
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPath === '/foods'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:text-primary'
            }`}
          >
            All Foods
          </Link>
          <Link
            to="/restaurants"
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPath === '/restaurants'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Restaurants
          </Link>
          <Link
            to="/deals"
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPath === '/deals'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Deals
          </Link>
          <Link
            to="/track"
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPath === '/track'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Track Order
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default FoodHeader;