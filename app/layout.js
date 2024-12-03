"use client";

import localFont from "next/font/local";
import "./styles/_globals.scss";
import { Box, AppBar, Toolbar } from "@mui/material";
import layoutStyles from "./sass/_mainlayout.module.scss";
import { Provider } from "react-redux";
import store from "./store/Store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// metadata property is removed because it's not directly usable in a `client` component.
// Instead, metadata should be defined in `app/layout.js` in the `export const metadata` block.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <Box className={layoutStyles["main-layout-style"]}>
            <main>{children}</main>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
