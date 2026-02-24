import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-xl font-semibold mb-4">Savvidis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Είδη στρατιωτικά, αστυνομικά, κυνηγετικά και camping–επιβίωση. Ποιότητα και αξιοπιστία.
          </p>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Καταλόγος</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products?category=stratiotika" className="hover:text-foreground transition-colors">Στρατιωτικά Είδη</Link></li>
            <li><Link to="/products?category=astynomika" className="hover:text-foreground transition-colors">Αστυνομικά Είδη</Link></li>
            <li><Link to="/products?category=kynigetika" className="hover:text-foreground transition-colors">Κυνηγετικά Είδη</Link></li>
            <li><Link to="/products?category=kynigetika&subcategory=physigia" className="hover:text-foreground transition-colors">Φυσιγγια</Link></li>
            <li><Link to="/products?category=camping" className="hover:text-foreground transition-colors">Camping-Επιβίωση</Link></li>
            <li><Link to="/products?category=accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Υποστήριξη</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Αποστολή & Επιστροφές</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Οδηγός Μεγεθών</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Επικοινωνία</span></li>
            <li><span className="hover:text-foreground transition-colors cursor-pointer">Συχνές Ερωτήσεις</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-3">Λάβετε πρόσβαση σε νέες αφίξεις και αποκλειστικές προσφορές.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Το email σας"
              className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Εγγραφή
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Savvidis. Όλα τα δικαιώματα διατηρούνται.
      </div>
    </div>
  </footer>
);

export default Footer;
