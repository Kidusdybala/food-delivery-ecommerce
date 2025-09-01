import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hair.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury human hair extensions" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Premium
            <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Human Hair
            </span>
            Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover our luxurious collection of 100% virgin human hair extensions, 
            wigs, and bundles. Transform your look with premium quality hair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="luxury" className="text-lg px-8 py-6">
              Shop Collection
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;