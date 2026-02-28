import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Οι κωδικοί δεν ταιριάζουν");
      return;
    }

    if (password.length < 6) {
      setError("Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες");
      return;
    }

    const success = await register(email, password, name);
    if (success) {
      navigate("/");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container py-20">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-center mb-2">
            Δημιουργία Λογαριασμού
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Εγγράψου για να απολαύσεις ειδικές προσφορές
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Όνομα
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Το όνομά σου"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Κωδικός
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Επιβεβαίωση Κωδικού
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Εγγραφή..." : "Εγγραφή"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Έχεις ήδη λογαριασμό;{" "}
            <Link to="/login" className="text-foreground hover:underline font-medium">
              Σύνδεση
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
