import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import { toast } from "sonner";
import { Check, Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Product Not Found</h1>
          <Link to="/products" className="text-sm text-accent hover:underline">Back to Shop</Link>
        </div>
        <Footer />
      </>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
    toast.success(`${product.name} added to cart`);
  };

  return (
    <>
      <Navbar />
      <main className="container py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-8 font-body">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-[3/4] bg-card overflow-hidden"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {product.isNew && (
              <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">New</span>
            )}
            <h1 className="font-display text-2xl md:text-3xl font-semibold mb-2">{product.name}</h1>
            <p className="text-xl font-body mb-6">${product.price}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Color selection */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">
                Color {selectedColor && `— ${selectedColor}`}
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === color.name ? "border-foreground scale-110" : "border-border"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  >
                    {selectedColor === color.name && (
                      <Check className="h-3.5 w-3.5" style={{ color: color.value === "#1a1a1a" ? "#fff" : "#1a1a1a" }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-3 py-2 text-sm border transition-colors ${
                      selectedSize === size
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Quantity</h3>
              <div className="flex items-center border border-border w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-muted transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-muted transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stock indicator */}
            <p className="text-xs text-muted-foreground mb-4">
              {product.stock > 10 ? "In stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
            </p>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? "Sold Out" : "Add to Cart"}
            </button>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
