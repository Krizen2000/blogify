import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import styles from "./layout.module.css";
import CacheProvider from "@context/cacheProvider";
import NavigationBar from "./navigationBar";
import Footer from "./footer";
import Head from "next/head";

export const metadata = {
  title: "Blogify",
  description: "A simple blogging platform that allows user to create blogs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="color-scheme" content="dark" />
      </Head>
      <body className={styles["body"]}>
        <CacheProvider>
          <NavigationBar />
          {children}
          <Footer />
        </CacheProvider>
      </body>
    </html>
  );
}
