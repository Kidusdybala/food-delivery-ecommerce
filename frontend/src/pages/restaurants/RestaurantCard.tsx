import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Clock, Truck, Plus } from "lucide-react";
import { useState } from "react";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  description: string;
  price: number;
  foods?: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  }>;
}

const RestaurantCard = ({
  name,
  cuisine,
  rating,
  deliveryTime,
  deliveryFee,
  image,
  description,
  price,
  foods
}: RestaurantCardProps) => {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const isRestaurant = foods && foods.length > 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
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
                <span>{deliveryFee === 0 ? 'Free' : `${deliveryFee} ETB`} delivery</span>
              </div>
            </div>

            <Button className="w-full" variant="food">
              View Details
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className={isRestaurant ? "max-w-4xl max-h-[80vh] overflow-y-auto" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        {isRestaurant ? (
          <div className="space-y-6">
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">{description}</p>

            <div>
              <h4 className="font-semibold mb-4">Menu Items</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {foods?.map((food) => (
                  <div key={food.id} className="border rounded-lg p-4 space-y-2">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-24 object-cover rounded"
                    />
                    <h5 className="font-medium">{food.name}</h5>
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                    <p className="text-lg font-bold text-primary">{food.price} ETB</p>
                    <Button size="sm" className="w-full">
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <img
              src={image}
              alt={name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div>
              <p className="text-muted-foreground mb-2">{description}</p>
              <p className="text-2xl font-bold text-primary">{price} ETB</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Add Soft Drink (Optional)</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="coca-cola"
                    name="drink"
                    value="Coca Cola"
                    onChange={(e) => setSelectedDrink(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="coca-cola" className="text-sm">Coca Cola - 50 ETB</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="sprite"
                    name="drink"
                    value="Sprite"
                    onChange={(e) => setSelectedDrink(e.target.value)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="sprite" className="text-sm">Sprite - 50 ETB</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="no-drink"
                    name="drink"
                    value=""
                    onChange={(e) => setSelectedDrink(null)}
                    className="w-4 h-4"
                    defaultChecked
                  />
                  <label htmlFor="no-drink" className="text-sm">No drink</label>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Total:</p>
                <p className="text-xl font-bold">
                  {price + (selectedDrink ? 50 : 0)} ETB
                </p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantCard;