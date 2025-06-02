"use client";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let headerTopWrapperClassName = styles.headerTopWrapper;
  if (isMenuOpen) {
    headerTopWrapperClassName += " " + styles.headerTopWrapperMenuOpen;
  }

  return (
    <>
      <div className={headerTopWrapperClassName}>
        <div className={styles.logo}>
          <Link href="/">Requests with fetch API</Link>
        </div>
        <div
          className={styles.menuIcon}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <div className={styles.menuClose}>X</div>
          ) : (
            <>
              <div className={styles.menuBar}></div>
              <div className={styles.menuBar}></div>
              <div className={styles.menuBar}></div>
            </>
          )}
        </div>
        <nav className={styles.nav}>
          <Link
            href="/"
            className={
              pathname === "/"
                ? styles.menuLink + " " + styles.active
                : styles.menuLink
            }
            onClick={() => setIsMenuOpen(false)}
          >
            async POST request and login
          </Link>
          <Link
            href="/async-get-request"
            className={
              pathname === "/about"
                ? styles.menuLink + " " + styles.active
                : styles.menuLink
            }
            onClick={() => setIsMenuOpen(false)}
          >
            async GET request
          </Link>
        </nav>
      </div>

      <div className={styles.clearHeader}></div>
    </>
  );
}
