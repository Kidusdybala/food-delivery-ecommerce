import { Shield, Truck, Heart, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Virgin Hair",
      description: "Guaranteed authentic virgin hair with no chemical processing or mixing."
    },
    {
      icon: Truck,
      title: "Free Worldwide Shipping",
      description: "Complimentary express shipping on all orders over $150."
    },
    {
      icon: Heart,
      title: "30-Day Returns",
      description: "Not satisfied? Return your hair within 30 days for a full refund."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Each bundle is hand-selected and quality tested by our experts."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full mb-4 group-hover:shadow-glow transition-shadow duration-300">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;