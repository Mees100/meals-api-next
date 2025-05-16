"use client";
import styles from "./page.module.css";
import PastaSauceRecipe from "./components/PastaSauceRecipe/PastaSauceRecipe";
import FormCreatMeal from "./components/CreateMeal/CreateMeal";
import Login from "./components/Login/Login";

export default function Home() {
  return (
    <div className={styles.page}>
      <FormCreatMeal />
      <Login />
      <PastaSauceRecipe />
    </div>
  );
}
