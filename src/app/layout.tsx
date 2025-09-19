import type { Metadata } from "next";
import "./globals.scss";
import Navigation from "./components/Navigation/Navigation";
import styles from "../styles/layout.module.scss";
import type { Viewport } from "next";
import { Roboto } from "next/font/google";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: "API-demo portfolio",
  description: "portfolio API-demo ",
};

const roboto = Roboto({
  weight: "400",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={roboto.variable}>
      <body className={styles.main}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
