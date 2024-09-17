"use client";
import { League_Spartan } from "next/font/google";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.scss";
import Header from "@/components/organisms/header";

const leagueSpartan = League_Spartan({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  colors: {
    purple: {
      1: "#7c5dfa",
      2: "#9277ff",
    },
    gray: {
      1: "#dfe3fa",
      2: "#888eb0",
      3: "#7e88c3",
      4: "#494e6e",
      5: "#373B53",
    },
    navy: {
      1: "#1e2139",
      2: "#252945",
    },
    black: {
      1: "#0c0e16",
      2: "#141625",
    },
    red: {
      1: "#ec5757",
      2: "#ff9797",
    },
    white: {
      1: "#f8f8fb",
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={leagueSpartan.className}>
        <main>
          <ChakraProvider theme={theme}>
            <Header />
            {children}
          </ChakraProvider>
        </main>
      </body>
    </html>
  );
}
