"use client";
import { use, useEffect, useState } from "react";

type Meal = {
  name: string;
  ingredients: string[];
  description: string;
  slug: string;
};

async function getMeal(slug: string): Promise<Meal | undefined> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/meals/${slug}`, {
      cache: "no-store",
    });

    if (response.ok) {
      return await response.json();
    }
    return;
  } catch (error) {
    console.error(error);
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<Meal>();

  useEffect(() => {
    getMeal(slug).then((r) => {
      if (r !== undefined) setData(r);
    });
  }, [slug]);
  return (
    <div>
      My Post: {data?.name} {data?.description}
    </div>
  );
}
