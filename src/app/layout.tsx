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
      3: "#6446E0",
      4: "#7862D0",
    },
    gray: {
      1: "#dfe3fa",
      2: "#888eb0",
      3: "#7e88c3",
      4: "#494e6e",
      5: "#373B53",
      6: "rgba(55, 59, 83, 0.0571)",
      7: "rgba(223, 227, 250, 0.0571)",
      8: "#6E728A",
      9: "#5C638A",
      10: "#5B6395",
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
      3: "#CB4A4A",
      4: "#D53F3F",
    },
    white: {
      1: "#f8f8fb",
      2: "#F9FAFE",
    },
    green: {
      1: "#33D69F",
      2: "rgba(51, 214, 159, 0.0571)",
      3: "#1D8160",
    },
    orange: {
      1: "#FF8F00",
      2: "rgba(255, 143, 0, 0.0571)",
      3: "#B75301",
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
      <head>
        <title>Invoicely</title>
        <link
          rel="icon"
          type="image/png"
          href="/Invoicely/favicons/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/Invoicely/favicons/favicon.svg"
        />
        <link rel="shortcut icon" href="/Invoicely/favicons/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Invoicely/favicons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/Invoicely/favicons/site.webmanifest" />
      </head>
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
