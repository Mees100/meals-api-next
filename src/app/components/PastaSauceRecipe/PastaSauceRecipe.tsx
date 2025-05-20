"use client";
import { useEffect, useState } from "react";
import MainInner from "../MainInner/MainInner";

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
      `https://meal-api-eight.vercel.app/meals?page=1&limit=10`,
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

  const listItems = data.map((item) => <li key={item.slug}>{item.name}</li>);
  return (
    <>
      <MainInner>
        <ul>{listItems}</ul>
      </MainInner>
    </>
  );
}
