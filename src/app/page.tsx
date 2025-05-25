"use client";
import styles from "./page.module.css";
import FormCreatMeal from "./components/CreateMeal/CreateMeal";
import Login from "./components/Login/Login";
import MainInner from "./components/MainInner/MainInner";

export default function Home() {
  return (
    <MainInner>
      <div>
        <FormCreatMeal />
        <Login />
      </div>
    </MainInner>
  );
}
