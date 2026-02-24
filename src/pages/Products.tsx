import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories, categoryTree } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { SlidersHorizontal, X } from "lucide-react";

type SortOption = "newest" | "price-asc" | "price-desc";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useProducts();
  const categoryParam = searchParams.get("category") || "all";
  const subcategoryParam = searchParams.get("subcategory") || null;

  // Ensure category is set when subcategory is in URL (e.g. direct link to physigia)
  useEffect(() => {
    if (subcategoryParam === "physigia" && categoryParam === "all") {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("category", "kynigetika");
          return next;
        },
        { replace: true }
      );
    }
  }, [subcategoryParam, categoryParam, setSearchParams]);
  const filterParam = searchParams.get("filter");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryParam !== "all") {
      result = result.filter((p) => p.category === categoryParam);
    }
    if (subcategoryParam) {
      result = result.filter((p) => p.subcategory === subcategoryParam);
    }
    if (filterParam === "new") {
      result = result.filter((p) => p.isNew);
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return result;
  }, [categoryParam, subcategoryParam, filterParam, sort]);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "all") {
      params.delete("category");
      params.delete("subcategory");
    } else {
      params.set("category", cat);
      params.delete("subcategory");
    }
    params.delete("filter");
    setSearchParams(params);
  };

  const setSubcategory = (sub: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (sub) {
      params.set("subcategory", sub);
    } else {
      params.delete("subcategory");
    }
    setSearchParams(params);
  };

  const pageTitle =
    categoryParam !== "all"
      ? categories.find((c) => c.slug === categoryParam)?.name || "All"
      : filterParam === "new"
      ? "New Arrivals"
      : "All Products";

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold">{pageTitle}</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-background border border-border text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-48 flex-shrink-0`}>
            <div className="flex items-center justify-between md:hidden mb-4">
              <span className="font-medium text-sm">Filters</span>
              <button onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></button>
            </div>
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">Category</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCategory("all")}
                    className={`text-sm transition-colors ${categoryParam === "all" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => setCategory(cat.slug)}
                      className={`text-sm transition-colors ${categoryParam === cat.slug ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {categoryParam !== "all" &&
              categoryTree[categoryParam as keyof typeof categoryTree]?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3">
                    Υποκατηγορίες
                  </h3>
                  <button
                    onClick={() => setSubcategory(null)}
                    className={`mb-3 text-xs transition-colors ${
                      !subcategoryParam
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Όλα
                  </button>
                  {categoryTree[categoryParam as keyof typeof categoryTree].map((group) => (
                    <div key={group.slug} className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        {group.name}
                      </p>
                      <ul className="space-y-1 pl-2">
                        {group.children.map((sub) => (
                          <li key={sub.slug}>
                            <button
                              onClick={() => setSubcategory(sub.slug)}
                              className={`text-sm transition-colors ${
                                subcategoryParam === sub.slug
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
          </aside>

          {/* Product grid */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-20">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
