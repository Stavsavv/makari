import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import { physigiaImages } from "./physigia";

export type Subcategory = "physigia";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: "stratiotika" | "astynomika" | "kynigetika" | "camping" | "accessories";
  subcategory?: Subcategory;
  sizes: string[];
  colors: { name: string; value: string }[];
  stock: number;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Tailored Blazer",
    description: "A relaxed-fit single-breasted blazer crafted from premium wool blend. Features notch lapels and a single-button closure for an effortlessly polished look.",
    price: 285,
    images: [product1],
    category: "astynomika",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", value: "#C4A882" },
      { name: "Black", value: "#1a1a1a" },
    ],
    stock: 24,
    isNew: true,
  },
  {
    id: "2",
    name: "Slim-Fit Wool Trousers",
    description: "Tailored slim-fit trousers in fine wool with a pressed crease. Features a zip fly, hook-and-bar closure, and slanted side pockets.",
    price: 165,
    images: [product2],
    category: "stratiotika",
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Black", value: "#1a1a1a" },
      { name: "Charcoal", value: "#3a3a3a" },
    ],
    stock: 35,
  },
  {
    id: "3",
    name: "Cashmere Blend Sweater",
    description: "Luxuriously soft crew-neck sweater knitted from a cashmere and wool blend. Relaxed fit with ribbed cuffs and hem.",
    price: 195,
    images: [product3],
    category: "kynigetika",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", value: "#F5F0E8" },
      { name: "Camel", value: "#C4A472" },
    ],
    stock: 18,
    isNew: true,
  },
  {
    id: "4",
    name: "Cotton Shirt Dress",
    description: "A versatile shirt dress in crisp cotton poplin. Features a point collar, button-through front, and an elasticated waist for a flattering silhouette.",
    price: 145,
    images: [product4],
    category: "astynomika",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", value: "#FAFAFA" },
      { name: "Sky Blue", value: "#B4C9D9" },
    ],
    stock: 42,
  },
  {
    id: "5",
    name: "Leather Tote Bag",
    description: "Spacious tote bag crafted from full-grain vegetable-tanned leather. Unlined interior with a magnetic snap closure. Develops a beautiful patina over time.",
    price: 340,
    images: [product5],
    category: "accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Cognac", value: "#8B5E34" },
      { name: "Black", value: "#1a1a1a" },
    ],
    stock: 12,
    isNew: true,
  },
  {
    id: "6",
    name: "Wool Overcoat",
    description: "A classic double-breasted overcoat in Italian wool. Knee-length with notch lapels, padded shoulders, and a back vent.",
    price: 425,
    images: [product6],
    category: "stratiotika",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", value: "#1B2A4A" },
      { name: "Camel", value: "#C4A472" },
    ],
    stock: 8,
  },
  {
    id: "7",
    name: "Minimal Leather Sneakers",
    description: "Clean-lined low-top sneakers in smooth leather with a cushioned insole. The timeless silhouette pairs effortlessly with everything.",
    price: 220,
    images: [product7],
    category: "camping",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "White", value: "#FAFAFA" },
      { name: "Black", value: "#1a1a1a" },
    ],
    stock: 30,
  },
  {
    id: "8",
    name: "Cotton Joggers",
    description: "Relaxed-fit joggers in heavyweight organic cotton fleece. Features an elasticated drawstring waist, side pockets, and ribbed cuffs.",
    price: 95,
    images: [product8],
    category: "camping",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Grey Marl", value: "#9E9E9E" },
      { name: "Black", value: "#1a1a1a" },
    ],
    stock: 55,
  },
  // Φυσιγγια (ammunition) - one product per image from eikones folder
  ...physigiaImages.map((img, i) => ({
    id: `physigia-${i + 1}`,
    name: `Φυσιγγια ${i + 1}`,
    description: "Επαγγελματικές φυσιγγιές για κυνηγετική χρήση.",
    price: 0,
    images: [img],
    category: "kynigetika" as const,
    subcategory: "physigia" as Subcategory,
    sizes: ["Ν/Α"],
    colors: [{ name: "Ν/Α", value: "#1a1a1a" }],
    stock: 99,
  })),
];

export const categories = [
  { id: "stratiotika", name: "ΣΤΡΑΤΙΩΤΙΚΑ ΕΙΔΗ", slug: "stratiotika" },
  { id: "astynomika", name: "ΑΣΤΥΝΟΜΙΚΑ ΕΙΔΗ", slug: "astynomika" },
  { id: "kynigetika", name: "ΚΥΝΗΓΕΤΙΚΑ ΕΙΔΗ", slug: "kynigetika" },
  { id: "camping", name: "CAMPING-ΕΠΙΒΙΩΣΗ", slug: "camping" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
] as const;

export const subcategories: Record<string, { slug: string; name: string }[]> = {
  kynigetika: [
    { slug: "physigia", name: "Φυσιγγια" },
  ],
};
