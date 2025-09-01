import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Brazilian Straight Hair Bundle",
      price: 189,
      originalPrice: 249,
      image: "/api/placeholder/400/300",
      rating: 5,
      reviews: 127,
      description: "Premium 100% virgin Brazilian hair, straight texture, available in multiple lengths."
    },
    {
      id: 2,
      name: "Peruvian Body Wave Hair",
      price: 199,
      originalPrice: 259,
      image: "/api/placeholder/400/300",
      rating: 5,
      reviews: 89,
      description: "Luxurious body wave texture with natural movement and bounce."
    },
    {
      id: 3,
      name: "Malaysian Curly Hair Bundle",
      price: 219,
      image: "/api/placeholder/400/300",
      rating: 4,
      reviews: 156,
      description: "Beautiful curly texture that maintains its pattern through multiple washes."
    },
    {
      id: 4,
      name: "Indian Deep Wave Hair",
      price: 179,
      originalPrice: 229,
      image: "/api/placeholder/400/300",
      rating: 5,
      reviews: 203,
      description: "Deep wave pattern with natural shine and incredible volume."
    },
    {
      id: 5,
      name: "Cambodian Straight Hair",
      price: 209,
      image: "/api/placeholder/400/300",
      rating: 5,
      reviews: 67,
      description: "Silky straight hair with natural movement and long-lasting quality."
    },
    {
      id: 6,
      name: "Vietnamese Loose Wave",
      price: 189,
      originalPrice: 239,
      image: "/api/placeholder/400/300",
      rating: 4,
      reviews: 112,
      description: "Loose wave pattern perfect for everyday styling with natural flow."
    }
  ];

  return (
    <section id="products" className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Hair Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of 100% virgin human hair 
            from the finest sources around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              rating={product.rating}
              reviews={product.reviews}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;