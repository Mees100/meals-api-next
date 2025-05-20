import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation/Navigation";
import styles from "../styles/layout.module.scss";

export const metadata: Metadata = {
  title: "API-demo portfolio",
  description: "portfolio API-demo ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Navigation />
      <body className={styles.main}>{children}</body>
    </html>
  );
}
