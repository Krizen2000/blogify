import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap";
import "./globals.css";
import CacheProvider from "@context/cacheProvider";
import NavigationBar from "./navigationBar";
import Footer from "./footer";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <CacheProvider>
          <NavigationBar />
          {children}
          <Footer />
        </CacheProvider>
      </body>
    </html>
  );
}
