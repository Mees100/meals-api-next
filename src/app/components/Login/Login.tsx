("use client");
import { useForm, SubmitHandler } from "react-hook-form";

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
      }
      alert("helaas");
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}
