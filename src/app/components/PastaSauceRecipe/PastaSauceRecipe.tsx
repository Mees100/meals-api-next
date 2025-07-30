"use client";
import { useEffect, useState } from "react";
import MainInner from "../MainInner/MainInner";
import styles from "./PastaSauceRecipe.module.scss";
import Link from "next/link";

type Meal = {
  name: string;
  ingredients: string[];
  description: string;
  slug: string;
};

type MealList = {
  data: Meal[];
  meta: object;
};

async function getMeals(): Promise<MealList | undefined> {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/meals?page=1&limit=10`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      return await response.json();
    }
    throw new Error("request failed");
  } catch (error) {
    console.error(error);
  }
}
export default function PastaSauceRecipe() {
  const [data, setData] = useState<Meal[]>([]);

  useEffect(() => {
    getMeals().then((r) => {
      if (r !== undefined) setData(r.data);
    });
  }, []);

  const listItems = data.map((item) => (
    <li key={item.slug}>
      <Link href={`meal/${item.slug}`}>{item.name}</Link>
    </li>
  ));
  return (
    <>
      <MainInner>
        <div className={styles.container}>
          <h1>Maaltijden - async GET request</h1>
          <div className={styles.listRecipe}>
            <ul>{listItems}</ul>
          </div>
        </div>
      </MainInner>
    </>
  );
}
