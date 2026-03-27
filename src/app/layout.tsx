import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: { default: "Ahmad Auliadi Y | Geotechnical Engineering Researcher", template: "%s | Ahmad Auliadi Y" }, description: "Portfolio of Ahmad Auliadi Y — computational geotechnical earthquake engineering research at ITERA.", manifest: "/manifest.json" };
export const viewport: Viewport = { themeColor: "#FAFAF8", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="scroll-smooth"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
  </head><body className="min-h-screen flex flex-col"><Navbar/><main className="flex-1">{children}</main><Footer/></body></html>);
}
