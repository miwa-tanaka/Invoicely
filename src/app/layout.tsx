"use client";
import { League_Spartan } from "next/font/google";
import { ChakraProvider, extendTheme, Flex } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import "../styles/globals.scss";
import Header from "@/components/organisms/header";

const leagueSpartan = League_Spartan({
  weight: ["400", "500", "700"],
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
      6: "rgba(55, 59, 83, 0.0571)",
      7: "rgba(223, 227, 250, 0.0571)",
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
      2: "#F9FAFE",
    },
    green: {
      1: "#33D69F",
      2: "rgba(51, 214, 159, 0.0571)",
    },
    orange: {
      1: "#FF8F00",
      2: "rgba(255, 143, 0, 0.0571)",
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
          <RecoilRoot>
            <ChakraProvider theme={theme}>
              <Flex direction={{ base: "column", md: "row" }}>
                <Header />
                {children}
              </Flex>
            </ChakraProvider>
          </RecoilRoot>
        </main>
      </body>
    </html>
  );
}
