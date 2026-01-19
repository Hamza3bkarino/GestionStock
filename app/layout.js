import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import NavBar from "./components/NavBar";


export const metadata = {
  title: "Stock Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="font-display">
        <Providers>
            <NavBar/>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>

    </html>
  );
}
