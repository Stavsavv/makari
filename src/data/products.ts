import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import { physigiaImages } from "./physigia";

export type Subcategory = string;

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

export type CategoryGroup = {
  slug: string;
  name: string;
  children: { slug: Subcategory; name: string }[];
};

export const categoryTree: Record<Product["category"], CategoryGroup[]> = {
  stratiotika: [
    {
      slug: "stratiotika-rouxa-stoles",
      name: "Ρούχα & Στολές",
      children: [
        { slug: "stratiotika-pantelonia", name: "Στρατιωτικά παντελόνια" },
        { slug: "stratiotika-mplouzes-tshirts", name: "Μπλούζες & T-shirts" },
        { slug: "stratiotika-mpoufan-jacket", name: "Μπουφάν & Jacket" },
        { slug: "stratiotika-papoutsia-mpotes", name: "Παπούτσια & Μπότες" },
      ],
    },
    {
      slug: "stratiotika-exoplismos-axesouar",
      name: "Εξοπλισμός & Αξεσουάρ",
      children: [
        { slug: "stratiotika-zones-fysiggiothikes", name: "Ζώνες & Φυσιγγιοθήκες" },
        { slug: "stratiotika-sakidia-backpacks", name: "Σακίδια & Backpacks" },
        { slug: "stratiotika-gantia-kalyimmata", name: "Γάντια & Καλύμματα" },
      ],
    },
    {
      slug: "stratiotika-prostasia-asfaleia",
      name: "Προστασία & Ασφάλεια",
      children: [
        { slug: "stratiotika-krania", name: "Κράνη" },
        { slug: "stratiotika-gileka-prostasias", name: "Γιλέκα προστασίας" },
      ],
    },
    {
      slug: "stratiotika-opla-axesouar",
      name: "Όπλα & Αξεσουάρ Όπλων (νόμιμα)",
      children: [
        { slug: "stratiotika-maxairia-stratiotika", name: "Μαχαίρια στρατιωτικά" },
        { slug: "stratiotika-opla-ekpaidefsis-airsoft", name: "Όπλα εκπαίδευσης / airsoft" },
      ],
    },
  ],
  astynomika: [
    {
      slug: "astynomika-rouxa-stoles",
      name: "Ρούχα & Στολές",
      children: [
        { slug: "astynomika-stoles-astynomias", name: "Στολές Αστυνομίας" },
        { slug: "astynomika-tshirts-poukamisa", name: "T-shirts & Πουκάμισα" },
        { slug: "astynomika-papoutsia-mpotes", name: "Παπούτσια & Μπότες" },
      ],
    },
    {
      slug: "astynomika-exoplismos-prostasias",
      name: "Εξοπλισμός Προστασίας",
      children: [
        { slug: "astynomika-alexisfaira-gileka", name: "Αλεξίσφαιρα Γιλέκα" },
        { slug: "astynomika-krania-prostateftika", name: "Κράνη & Προστατευτικά" },
      ],
    },
    {
      slug: "astynomika-ergaleia-axesouar",
      name: "Εργαλεία & Αξεσουάρ",
      children: [
        { slug: "astynomika-cheiropedes", name: "Χειροπέδες" },
        { slug: "astynomika-fakoi-radiosyskeves", name: "Φακοί & Ραδιοσυσκευές" },
        { slug: "astynomika-zones-thikes-exoplismou", name: "Ζώνες & Θήκες Εξοπλισμού" },
      ],
    },
  ],
  kynigetika: [
    {
      slug: "kynigetika-rouxa-papoutsia",
      name: "Ρούχα & Παπούτσια",
      children: [
        { slug: "kynigetika-kamouflaz-roucha", name: "Καμουφλάζ Ρούχα" },
        { slug: "kynigetika-mpotes-kynigiou", name: "Μπότες Κυνηγιού" },
      ],
    },
    {
      slug: "kynigetika-opla-axesouar",
      name: "Όπλα & Αξεσουάρ",
      children: [
        { slug: "kynigetika-karampines-tyfekia", name: "Καραμπίνες & Τυφέκια" },
        { slug: "kynigetika-tsok-exartimata-oplon", name: "Τσοκ & Εξαρτήματα Όπλων" },
      ],
    },
    {
      slug: "kynigetika-ergaleia",
      name: "Κυνηγετικά Εργαλεία",
      children: [
        { slug: "kynigetika-stoxoi-fysiggia", name: "Στόχοι & Φυσίγγια" }, // keeps existing physigia concept
        { slug: "kynigetika-sakidia-tsantes-kynigiou", name: "Σακίδια & Τσάντες Κυνηγιού" },
        { slug: "kynigetika-dioptres-kialia", name: "Διόπτρες & Κιάλια" },
        { slug: "kynigetika-koutia-metaforas", name: "Κουτιά Μεταφοράς" },
        { slug: "kynigetika-maxairia-ergaleia-epiviosis", name: "Μαχαίρια & Εργαλεία Επιβίωσης" },
      ],
    },
  ],
  camping: [
    {
      slug: "camping-skines-ypnosakoi",
      name: "Σκηνές & Υπνόσακοι",
      children: [
        { slug: "camping-skines", name: "Σκηνές" },
        { slug: "camping-ypnosakoi", name: "Υπνόσακοι" },
      ],
    },
    {
      slug: "camping-fotismos-fakoi",
      name: "Φωτισμός & Φακοί",
      children: [
        { slug: "camping-fotismos", name: "Φωτισμός" },
        { slug: "camping-fakoi", name: "Φακοί" },
      ],
    },
    {
      slug: "camping-ergaleia-maxairia",
      name: "Εργαλεία & Μαχαίρια",
      children: [
        { slug: "camping-ergaleia", name: "Εργαλεία" },
        { slug: "camping-maxairia", name: "Μαχαίρια" },
      ],
    },
    {
      slug: "camping-skevi-mageiriki",
      name: "Σκεύη & Εξοπλισμός Μαγειρικής",
      children: [
        { slug: "camping-skevi", name: "Σκεύη" },
        { slug: "camping-exoplismos-mageirikis", name: "Εξοπλισμός Μαγειρικής" },
      ],
    },
    {
      slug: "camping-systimata-nerou",
      name: "Συστήματα Καθαρισμού & Φιλτραρίσματος Νερού",
      children: [
        { slug: "camping-katharismos-nerou", name: "Καθαρισμός Νερού" },
        { slug: "camping-filtrarismata-nerou", name: "Φιλτραρίσματα Νερού" },
      ],
    },
    {
      slug: "camping-roucha-papoutsia-outdoor",
      name: "Ρούχα & Παπούτσια Outdoor",
      children: [
        { slug: "camping-roucha-outdoor", name: "Ρούχα Outdoor" },
        { slug: "camping-papoutsia-outdoor", name: "Παπούτσια Outdoor" },
      ],
    },
    {
      slug: "camping-epiviosi-kits",
      name: "Επιβίωση & Survival Kits",
      children: [
        { slug: "camping-epiviosi", name: "Επιβίωση" },
        { slug: "camping-survival-kits", name: "Survival Kits" },
      ],
    },
    {
      slug: "camping-sxoinia-kouvertes-ylika",
      name: "Σχοινιά, Κουβέρτες, Υλικά Κατασκευών",
      children: [
        { slug: "camping-sxoinia", name: "Σχοινιά" },
        { slug: "camping-kouvertes", name: "Κουβέρτες" },
        { slug: "camping-ylika-kataskevon", name: "Υλικά Κατασκευών" },
      ],
    },
  ],
  accessories: [
    {
      slug: "accessories-zones-thikes",
      name: "Ζώνες & Θήκες",
      children: [
        { slug: "accessories-zones", name: "Ζώνες" },
        { slug: "accessories-thikes", name: "Θήκες" },
      ],
    },
    {
      slug: "accessories-tsantes-kapela",
      name: "Τσάντες & Καπέλα",
      children: [
        { slug: "accessories-tsantes", name: "Τσάντες" },
        { slug: "accessories-kapela", name: "Καπέλα" },
        { slug: "accessories-sakidia-tsantes", name: "Σακίδια & Τσάντες" },
      ],
    },
    {
      slug: "accessories-exoplismos-prostasias",
      name: "Εξοπλισμός Προστασίας",
      children: [
        { slug: "accessories-alexisfaira-gileka", name: "Αλεξίσφαιρα Γιλέκα" },
        { slug: "accessories-krania-prostateftika", name: "Κράνη & Προστατευτικά" },
      ],
    },
    {
      slug: "accessories-ergaleia-axesouar",
      name: "Εργαλεία & Αξεσουάρ",
      children: [
        { slug: "accessories-cheiropedes", name: "Χειροπέδες" },
        { slug: "accessories-fakoi-radiosyskeves", name: "Φακοί & Ραδιοσυσκευές" },
        { slug: "accessories-zones-thikes-exoplismou", name: "Ζώνες & Θήκες Εξοπλισμού" },
      ],
    },
  ],
};

