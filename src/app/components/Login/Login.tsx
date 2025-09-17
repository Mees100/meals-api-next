"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import styles from "./Login.module.scss";
import { setToken } from "./utils";
import Button from "@mui/material/Button";

type TokenResponse = {
  access_token: string;
  token_type: string;
};

export async function getToken(
  username: string,
  password: string
): Promise<TokenResponse | undefined> {
  try {
    const response = await fetch("http://127.0.0.1:8000/token", {
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

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    getToken(data.username, data.password).then((t) => {
      if (t !== undefined) {
        setToken(t.access_token);
        setShowModal(false);
        onLogin();
        return;
      }
      alert("helaas, het inloggen is niet gelukt");
    });

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        className={styles.btnModalOpen}
        onClick={() => setShowModal(true)}
        data-testid="btnModalOpen"
        variant="contained"
      >
        Inloggen
      </Button>
      {showModal && (
        <div className={styles.modalWrapper}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              <h2>Inloggen</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputGroup}>
                <label>naam</label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("username", { required: true })}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label>wachtwoord</label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                  required
                />
                {errors.password && <span>Dit veld is verplicht</span>}
              </div>
              <button type="submit" data-testid="modalInloggen">
                Inloggen
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setShowModal(false);
                }}
              >
                Annuleren
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
