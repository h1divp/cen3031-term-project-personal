import "@/styles/globals.css";
import { Roboto } from "next/font/google"; 
import { Providers } from "./providers"; 

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={roboto.className}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
