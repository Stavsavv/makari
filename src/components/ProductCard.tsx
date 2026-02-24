import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-[3/4] overflow-hidden bg-card mb-3 relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1">
            New
          </span>
        )}
      </div>
      <h3 className="font-body text-sm font-medium">{product.name}</h3>
      <p className="text-sm text-muted-foreground mt-0.5">${product.price}</p>
    </Link>
  </motion.div>
);

export default ProductCard;
