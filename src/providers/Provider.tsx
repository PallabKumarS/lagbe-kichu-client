"use client";

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
      </StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
