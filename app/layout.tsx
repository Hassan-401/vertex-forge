import type { Metadata } from "next";
import { Cairo, Geist_Mono, Poppins } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// rounded geometric sans used by the e-menu designs (Latin); Arabic falls
// back to Cairo. Exposed as the --font-poppins CSS variable.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
if(t==='dark'){d.classList.add('dark')}else{d.classList.remove('dark')}
var l=localStorage.getItem('vf-lang');
if(l==='ar'){d.lang='ar';d.dir='rtl'}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cairo.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
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
