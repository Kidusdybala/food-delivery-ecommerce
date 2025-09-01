import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Truck } from "lucide-react";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
}

const RestaurantCard = ({ 
  name, 
  cuisine,
  rating, 
  deliveryTime,
  deliveryFee,
  image, 
  description 
}: RestaurantCardProps) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-luxury transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary">
          {cuisine}
        </div>
        
        {deliveryFee === 0 && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
            Free Delivery
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-secondary text-secondary" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            <span>{deliveryFee === 0 ? 'Free' : `$${deliveryFee}`} delivery</span>
          </div>
        </div>
        
        <Button className="w-full" variant="food">
          View Menu
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;