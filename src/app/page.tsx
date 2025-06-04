"use client";
import { useEffect, useState } from "react";
import FormCreateMeal from "./components/CreateMeal/CreateMeal";
import Login from "./components/Login/Login";
import MainInner from "./components/MainInner/MainInner";
import { getToken } from "./components/Login/utils";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const hasToken = getToken() !== null;
    setIsLoggedIn(hasToken), [];
  });
  return (
    <MainInner>
      <div>
        <FormCreateMeal isLoggedIn={isLoggedIn} />
        <Login onLogin={() => setIsLoggedIn(true)} />
      </div>
    </MainInner>
  );
}
