import Image from "next/image";
import styles from "./page.module.css";
import PastaSauceRecipe from "./components/PastaSauceRecipe/PastaSauceRecipe";
import FormulierMaaltijd from "./components/CreateMeal/CreatMeal";

export default function Home() {
  return (
    <div className={styles.page}>
      <PastaSauceRecipe />
    </div>
  );
}
