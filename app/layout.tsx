import type { Metadata } from "next";
import { Cairo, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "فيرتكس فورج | تصميم وتطوير مواقع | Vertex Forge",
  description:
    "فيرتكس فورج (Vertex Forge) — بنعملك موقع احترافي أونلاين في 48 ساعة. تصميم عصري، أداء سريع، ودعم بعد التسليم.",
  keywords: [
    "تصميم مواقع",
    "تطوير ويب",
    "متاجر إلكترونية",
    "Vertex Forge",
    "فيرتكس فورج",
  ],
};

/**
 * Applies the saved theme + language before first paint so the page never
 * flashes the wrong colour scheme or text direction.
 */
const NO_FLASH = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem('vf-theme');
if(t==='light'){d.classList.remove('dark')}else{d.classList.add('dark')}
var l=localStorage.getItem('vf-lang');
if(l==='en'){d.lang='en';d.dir='ltr'}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`dark ${cairo.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
