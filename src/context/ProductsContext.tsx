import { createContext, useContext, useState, type ReactNode } from "react";
import { products as initialProducts, type Product } from "@/data/products";

type ProductsContextValue = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, partial: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: string, partial: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...partial } : p)),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return ctx;
};

