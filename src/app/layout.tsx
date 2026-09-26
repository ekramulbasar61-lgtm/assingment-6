import type { Metadata } from "next";
import "./globals.css";
import { FitLogProvider } from "@/context/FitLogContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";

export const metadata: Metadata = { title: "FitLog — Workout Library", description: "A dark, no-nonsense workout library and daily plan tracker." };
export default function RootLayout({ children }: Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body><FitLogProvider><Navbar />{children}<Footer /><Toast /></FitLogProvider></body></html>;
}
