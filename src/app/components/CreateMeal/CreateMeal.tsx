"use client";
import { useState } from "react";
import Form from "next/form";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateMeal.module.scss";
import { getToken } from "../Login/utils";
import Alert from "@mui/material/Alert";

const url = "http://127.0.0.1:8000/meals";

async function createMeal(
  name: string,
  ingredients: string[],
  description: string,
  slug: string
): Promise<boolean> {
  const apiKey = getToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        ingredients: ingredients,
        description,
        slug: slug,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Meal created successfully:", jsonResponse);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

type Inputs = {
  name: string;
  ingredient: string;
  description: string;
  slug: string;
};
export default function FormCreateMeal({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const ingredientsArray = data.ingredient
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const result = await createMeal(
      data.name,
      ingredientsArray,
      data.description,
      data.slug
    );
    if (result === false) {
      setMessage("Er trad een fout op");
    } else {
      setMessage("Het is gelukt");
    }
  };

  return (
    <>
      <div className={styles.contactPage}>
        <div className={styles.contactForm}>
          {isLoggedIn ? (
            <Alert severity="success">Je bent ingelogd</Alert>
          ) : (
            <div className={styles.messageInloggen}>
              Let op, je moet eerst nog inloggen
            </div>
          )}
          {message && <div className={styles.message}>{message}</div>}
          <Form action="/search" onSubmit={handleSubmit(onSubmit)}>
            <h1>Maaltijd maken</h1>

            <div className={styles.controlLabelstar}>
              <strong>*</strong>
              Verplicht veld
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.required}>
                naam
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Dit veld is verplicht" })}
                placeholder="naam"
              ></input>
              {errors.name && (
                <span className={styles.errorMessage}>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="ingredients" className={styles.required}>
                ingrediënten
              </label>
              <input
                type="text"
                id="ingredients"
                {...register("ingredient", {
                  required: "Dit veld is verplicht",
                })}
                placeholder="ingredients"
              ></input>
              {errors.ingredient && (
                <span className={styles.errorMessage}>
                  {errors.ingredient.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.required}>
                beschrijving (minstens 5 letters)
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {
                  required: "Dit veld is verplicht",
                  minLength: {
                    value: 5,
                    message: "Vul minstens 5 letters in",
                  },
                })}
                placeholder="description"
              ></input>
              {errors.description && (
                <span className={styles.errorMessage}>
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="slug" className={styles.required}>
                kenmerk(slug)
              </label>
              <input
                type="text"
                id="slug"
                {...register("slug", {
                  required: "Dit veld is verplicht",
                })}
                placeholder="kenmerk"
              ></input>
              {errors.slug && (
                <span className={styles.errorMessage}>
                  {errors.slug.message}
                </span>
              )}
            </div>

            <button type="submit">Opslaan</button>
          </Form>
        </div>
      </div>
    </>
  );
}
