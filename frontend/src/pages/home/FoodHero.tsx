import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Star } from "lucide-react";
import heroImage from "@/assets/hero-food-delivery.jpg";

const FoodHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Delicious food delivery" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <div className="flex items-center gap-2 mb-4">
            
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Delicious Food
            <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Order from your favorite restaurants and get fresh, hot meals 
            delivered right to your doorstep in under 30 minutes.
          </p>

          {/* Location Input */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center gap-4 mb4">
              <MapPin className="h-6 w-6 text-secondary" />
              <span className="text-white font-medium">Enter your delivery address</span>
            </div>
            <div className="flex gap-3 mt-4">
              <Input 
                placeholder="Street address, city, state..." 
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Button variant="food" size="lg" className="px-8">
                Find Food
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span>30 min delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span>Track in real-time</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-secondary" />
              <span>500+ restaurants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodHero;