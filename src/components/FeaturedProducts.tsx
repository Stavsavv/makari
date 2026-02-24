import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useProducts } from "@/context/ProductsContext";

const FeaturedProducts = () => {
  const { products } = useProducts();
  const featured = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">New Arrivals</h2>
        <Link
          to="/products?filter=new"
          className="text-sm font-body uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featured.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
