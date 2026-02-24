import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categorPolice from "@/assets/category-police.jpg";
import categoryArmy from "@/assets/category-army.webp";
import categoryHunting from "@/assets/category-hunt.jpg";
import categoryCamp from "@/assets/category-camp.webp";
import categoryAccessories from "@/assets/category-accessories.webp";

const categoryItems = [
  { name: "ΣΤΡΑΤΙΩΤΙΚΑ ΕΙΔΗ", slug: "stratiotika", image: categoryArmy },
  { name: "ΑΣΤΥΝΟΜΙΚΑ ΕΙΔΗ", slug: "astynomika", image: categorPolice },
  { name: "ΚΥΝΗΓΕΤΙΚΑ ΕΙΔΗ", slug: "kynigetika", image: categoryHunting },
  { name: "CAMPING-ΕΠΙΒΙΩΣΗ", slug: "camping", image: categoryCamp },
  { name: "ΑΞΕΣΟΥΑΡ", slug: "accessories", image: categoryAccessories },
];

const CategoryGrid = () => (
  <section className="container py-20">
    <h2 className="font-display text-2xl md:text-3xl font-semibold text-center mb-12">
      Shop by Category
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {categoryItems.map((cat, i) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link to={`/products?category=${cat.slug}`} className="group block">
            <div className="aspect-[3/4] overflow-hidden mb-3">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <h3 className="text-center font-body text-sm uppercase tracking-widest font-medium">
              {cat.name}
            </h3>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CategoryGrid;
