"use client";

import { ReactNode } from "react";
import styles from "./MainInner.module.scss";

export default function MainInner({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={styles.mainInner}>{children}</div>
    </>
  );
}
