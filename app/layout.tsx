import type { Metadata } from "next";
import { TodoAppProvider } from "@/context/TodoAppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "Todo List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#111111] text-white min-h-screen`}>
        <TodoAppProvider>
          <main className="container max-w-3xl mx-auto py-8 px-4">
            {children}
          </main>
        </TodoAppProvider>
      </body>
    </html>
  );
}