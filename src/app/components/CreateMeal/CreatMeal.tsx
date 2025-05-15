"use client";
import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";

const url = "https://meal-api-eight.vercel.app/meals";

async function creatMealtwo(
  name: string,
  ingredient: string,
  description: string
) {
  const apiKey = sessionStorage.getItem("access_token");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        ingredients: [ingredient],
        description: "string",
        slug: "string",
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Meal created successfully:", jsonResponse);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function FormulierMaaltijd() {
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setTitle(event.target.value);

  const onIngredientChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setIngredient(event.target.value);

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    creatMealtwo(title, ingredient, description);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
            required
          ></input>
          <input
            placeholder="Ingredient"
            value={ingredient}
            onChange={onIngredientChange}
            required
          ></input>
          <input
            placeholder="Description"
            value={description}
            onChange={onDescriptionChange}
            required
          ></input>
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}
