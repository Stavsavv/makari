import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "ΣΤΡΑΤΙΩΤΙΚΑ ΕΙΔΗ", href: "/products?category=stratiotika" },
  { label: "ΑΣΤΥΝΟΜΙΚΑ ΕΙΔΗ", href: "/products?category=astynomika" },
  {
    label: "ΚΥΝΗΓΕΤΙΚΑ ΕΙΔΗ",
    href: "/products?category=kynigetika",
    subcategories: [{ slug: "physigia", name: "Φυσιγγια" }],
  },
  { label: "CAMPING-ΕΠΙΒΙΩΣΗ", href: "/products?category=camping" },
  { label: "ΑΞΕΣΟΥΑΡ", href: "/products?category=accessories" },
  // Temporary: Admin link for development access
  { label: "ADMIN", href: "/admin" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        {/* Announcement bar */}
        <div className="bg-primary text-primary-foreground text-center text-xs tracking-widest py-2 font-body uppercase">
          Free shipping on orders over $200
        </div>

        <nav className="container flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link to="/" className="font-display text-xl md:text-2xl font-semibold tracking-tight">
            Savvidis
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              "subcategories" in link && link.subcategories?.length ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm font-body tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[180px]">
                    <DropdownMenuItem asChild>
                      <Link to={link.href}>Όλα Κυνηγετικά</Link>
                    </DropdownMenuItem>
                    {link.subcategories.map((sub) => (
                      <DropdownMenuItem key={sub.slug} asChild>
                        <Link to={`/products?category=kynigetika&subcategory=${sub.slug}`}>
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-body tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <Link to="/products" aria-label="Search">
              <Search className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
            </Link>
            <Link to="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[105px] z-40 bg-background border-b border-border lg:hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-border last:border-0">
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-display tracking-wide py-2 block"
                  >
                    {link.label}
                  </Link>
                  {"subcategories" in link && link.subcategories?.length ? (
                    <div className="pl-4 pb-2 flex flex-col gap-1">
                      {link.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/products?category=kynigetika&subcategory=${sub.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-muted-foreground hover:text-foreground py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
