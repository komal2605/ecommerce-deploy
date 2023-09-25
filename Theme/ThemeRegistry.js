"use client";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

let theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Catamaran, sans-serif",
      color: "#080808",
    },
    h2: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    h3: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    h4: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    h5: {
      fontFamily: "Catamaran, sans-serif",
      letterSpacing: "1.5px",
      color: "#000",
    },
    h6: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    subtitle1: {
      fontFamily: "Catamaran, sans-serif",
      color: "#999999",
    },
    subtitle2: {
      fontFamily: "Catamaran, sans-serif",
      color: "#929292",
    },
    body1: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    body2: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
    button: {
      fontFamily: "Catamaran, sans-serif",
      color: "#080808 !important",
    },
    caption: {
      fontFamily: "Catamaran, sans-serif",
      color: "#929292",
    },
    overline: {
      fontFamily: "Catamaran, sans-serif",
      color: "#000",
    },
  },
});

theme = responsiveFontSizes(theme);

export default function ThemeRegistry(props) {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
