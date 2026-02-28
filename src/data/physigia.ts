// Images from eikones folder - add your φυσιγγια (ammunition) product photos to src/assets/eikones/
// Supports: jpg, jpeg, png, webp, gif
const eikonesModules = import.meta.glob<{ default: string }>(
  "@/assets/eikones/**/*.{jpg,jpeg,png,webp,gif}",
  { eager: true },
);

export const physigiaImages: string[] = Object.values(eikonesModules).map(
  (m) => m.default,
);
