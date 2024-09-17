import type { Metadata } from "next";
import "../styles/globals.scss";
import Header from "@/components/organisms/header";
import Footer from "@/components/organisms/footer";

export const metadata: Metadata = {
  title: "Blossom Avenue",
  description: "Blossom Avenue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
