"use client";
import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import Form from "next/form";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./CreateMeal.module.scss";
import MainInner from "../MainInner/MainInner";

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

type Inputs = {
  name: string;
  ingredient: string;
  description: string;
};
export default function FormCreatMeal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    creatMealtwo(data.name, data.ingredient, data.description);

  return (
    <>
      <div className={styles.contactPage}>
        <div className={styles.contactForm}>
          <Form action="/search" onSubmit={handleSubmit(onSubmit)}>
            <h1>Creat meal</h1>

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
              <label htmlFor="ingredient" className={styles.required}>
                ingredients
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
                description (minstens 5 letters)
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

            <button type="submit">Submit</button>
          </Form>
        </div>
      </div>
    </>
  );
}

// export default function FormulierMaaltijd() {
//   const [title, setTitle] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [description, setDescription] = useState("");

//   const onTitleChange = (event: {
//     target: { value: SetStateAction<string> };
//   }) => setTitle(event.target.value);

//   const onIngredientChange = (event: {
//     target: { value: SetStateAction<string> };
//   }) => setIngredient(event.target.value);

//   const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) =>
//     setDescription(event.target.value);

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     creatMealtwo(title, ingredient, description);
//   };

//   return (
//     <>
//       <div>
//         <form onSubmit={handleSubmit}>
//           <input
//             placeholder="Title"
//             value={title}
//             onChange={onTitleChange}
//             required
//           ></input>
//           <input
//             placeholder="Ingredient"
//             value={ingredient}
//             onChange={onIngredientChange}
//             required
//           ></input>
//           <input
//             placeholder="Description"
//             value={description}
//             onChange={onDescriptionChange}
//             required
//           ></input>
//           <button type="submit">Create</button>
//         </form>
//       </div>
//     </>
//   );
// }
