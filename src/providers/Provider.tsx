"use client";

import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import { WebSocketProvider } from "./WebSocketProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <WebSocketProvider />
        {children}
        <Toaster richColors position="top-right" closeButton />
      </StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
