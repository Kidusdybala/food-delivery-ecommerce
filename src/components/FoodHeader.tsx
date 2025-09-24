import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Search, MapPin } from "lucide-react";

const FoodHeader = () => {
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
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Restaurants
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Cuisines
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Deals
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
            Track Order
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs font-medium text-primary-foreground flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default FoodHeader;