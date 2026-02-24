import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      {/* Newsletter band */}
      <section className="bg-sand py-16">
        <div className="container text-center max-w-lg">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">Stay in the Loop</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Subscribe for exclusive drops, styling tips, and 10% off your first order.
          </p>
          <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Index;
