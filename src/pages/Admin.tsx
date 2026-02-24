import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, categoryTree, type Product, type Subcategory } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<Product["category"]>("stratiotika");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const subcategory = formData.get("subcategory") as string | null;
    const imageFile = formData.get("image");

    const baseData = {
      name: (formData.get("title") as string) || "",
      description: (formData.get("description") as string) || "",
      price: Number(formData.get("price")) || 0,
      category: (formData.get("category") as Product["category"]) || "stratiotika",
      subcategory: subcategory ? (subcategory as Subcategory) : undefined,
      sizes: ["One Size"],
      colors: [{ name: "Default", value: "#000000" }],
      stock: Number(formData.get("stock")) || 0,
      isNew: true,
    };

    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = URL.createObjectURL(imageFile);
    }

    if (editingId) {
      updateProduct(editingId, {
        ...baseData,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      });
      alert("Product updated successfully!");
    } else {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        images: [imageUrl || ""],
        ...baseData,
      };
      addProduct(newProduct);
      alert("Product added successfully!");
    }

    setEditingId(null);
    e.currentTarget.reset();
  };

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <h1 className="font-display text-3xl font-semibold mb-6">
          Admin: {editingId ? "Edit Product" : "Add Product"}
        </h1>

        <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
          <input name="title" placeholder="Product Title" required className="w-full border px-3 py-2" />
          <input name="price" type="number" placeholder="Price (€)" required className="w-full border px-3 py-2" />
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Product["category"])}
            required
            className="w-full border px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug as Product["category"]}>
                {cat.name}
              </option>
            ))}
          </select>
          {categoryTree[selectedCategory]?.length > 0 && (
            <select name="subcategory" className="w-full border px-3 py-2" defaultValue="">
              <option value="">No subcategory</option>
              {categoryTree[selectedCategory]
                .flatMap((group) => group.children)
                .map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
            </select>
          )}
          <input name="stock" type="number" placeholder="Stock Quantity" required className="w-full border px-3 py-2" />
          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2"
          />
          <textarea name="description" placeholder="Description" required className="w-full border px-3 py-2"></textarea>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {editingId ? "Save Changes" : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Current Products</h2>
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.id} className="border p-2 rounded flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    €{p.price} · Stock: {p.stock}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(p.category);
                      setEditingId(p.id);
                    }}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete "${p.name}"?`)) {
                        deleteProduct(p.id);
                      }
                    }}
                    className="px-3 py-1 text-xs border border-red-500 text-red-600 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </> 
  );
};

export default Admin;