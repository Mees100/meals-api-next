"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import styles from "./Login.module.scss";

type TokenResponse = {
  access_token: string;
  token_type: string;
};

async function getToken(
  username: string,
  password: string
): Promise<TokenResponse | undefined> {
  try {
    const response = await fetch("https://meal-api-eight.vercel.app/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Request failed!");
  } catch (error) {
    console.error(error);
  }
}

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    getToken(data.username, data.password).then((t) => {
      if (t !== undefined) {
        sessionStorage.setItem("access_token", t.access_token);
        alert("Je bent ingelogd met " + t.access_token);
        return;
      }
      alert("helaas");
    });

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.btnModalOpen}
        onClick={() => setShowModal(true)}
      >
        Login
      </button>
      {showModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <div>
              <h2>Login</h2>
              <span
                onClick={() => setShowModal(false)}
                className={styles.modalClose}
                title="Close Modal"
              >
                &times;
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label>username</label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("username")}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  required
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <button className={styles.btnLogin} type="submit">
                Login
              </button>
              <button
                className={styles.btnCancel}
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
