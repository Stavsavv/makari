import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <main className="container py-10 min-h-[60vh]">
        <h1 className="font-display text-3xl md:text-4xl font-semibold mb-10">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 pb-6 border-b border-border"
                >
                  <Link to={`/product/${item.product.id}`} className="w-24 h-32 bg-card flex-shrink-0 overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-body text-sm font-medium hover:underline">
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.selectedColor} / {item.selectedSize}
                        </p>
                      </div>
                      <p className="text-sm font-medium">${item.product.price * item.quantity}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-muted transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-muted transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card p-6 h-fit">
              <h2 className="font-display text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-accent">Free shipping on orders over ${SHIPPING_THRESHOLD}</p>
                )}
                <div className="border-t border-border pt-3 flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="w-full mt-6 bg-primary text-primary-foreground py-4 text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/products"
                className="block text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
