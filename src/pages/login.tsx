import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password. Try password: demo123");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container py-20">
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-center mb-2">
            Καλωσήρθες Πίσω
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Συνδέσου στον λογαριασμό σου
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}
            
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
                className="w-full border border-border px-4 py-3 focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Σύνδεση..." : "Σύνδεση"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Δεν έχεις λογαριασμό;{" "}
            <Link to="/register" className="text-foreground hover:underline font-medium">
              Εγγραφή
            </Link>
          </p>

          <div className="mt-8 p-4 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-1">Demo Account:</p>
            <p className="text-muted-foreground">Use any email + password: <code className="bg-background px-1 py-0.5 rounded">demo123</code></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
