import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { UIProvider } from "@/lib/context/UIContext";
import LayoutContent from "@/components/layout/LayoutContent";

// Font configurations for luxury aesthetic
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HOMER - Luxury Jewelry & Custom Grillz | Athens & Southampton",
  description: "Discover exquisite luxury jewelry and custom grillz at HOMER. Premium craftsmanship in precious metals and gemstones. Located in Athens, Greece and Southampton, UK.",
  keywords: [
    "luxury jewelry",
    "custom grillz",
    "gold jewelry",
    "diamond jewelry",
    "precious metals",
    "custom jewelry",
    "Athens jewelry",
    "Southampton jewelry",
    "HOMER luxury",
  ].join(", "),
  authors: [{ name: "HOMER Luxury Jewelry" }],
  creator: "HOMER Luxury Jewelry",
  publisher: "HOMER Luxury Jewelry",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://homer-luxury.com",
    title: "HOMER - Luxury Jewelry & Custom Grillz",
    description: "Discover exquisite luxury jewelry and custom grillz at HOMER. Premium craftsmanship in precious metals and gemstones.",
    siteName: "HOMER Luxury Jewelry",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HOMER Luxury Jewelry Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOMER - Luxury Jewelry & Custom Grillz",
    description: "Discover exquisite luxury jewelry and custom grillz at HOMER. Premium craftsmanship in precious metals and gemstones.",
    images: ["/images/twitter-image.jpg"],
    creator: "@homer_luxury",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#a86e3b",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/cinzel-v12-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/montserrat-v25-latin-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "HOMER Luxury Jewelry",
              "description": "Luxury jewelry and custom grillz with premium craftsmanship",
              "url": "https://homer-luxury.com",
              "logo": "https://homer-luxury.com/images/logo.png",
              "image": "https://homer-luxury.com/images/store-front.jpg",
              "telephone": "+30 210 123 4567",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "123 Kolonaki Street",
                  "addressLocality": "Athens",
                  "postalCode": "10673",
                  "addressCountry": "GR"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "456 High Street",
                  "addressLocality": "Southampton",
                  "postalCode": "SO14 2HG",
                  "addressCountry": "GB"
                }
              ],
              "openingHours": "Mo-Sa 10:00-19:00",
              "priceRange": "€€€€",
              "paymentAccepted": ["Cash", "Credit Card", "PayPal", "Apple Pay", "Google Pay"],
              "currenciesAccepted": ["EUR", "GBP", "USD"],
            }),
          }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${montserrat.variable} antialiased bg-white text-gray-900`}
      >
        {/* Providers */}
        <CartProvider>
          <UIProvider>
            <LayoutContent>{children}</LayoutContent>
          </UIProvider>
        </CartProvider>

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[var(--homer-gold)] text-white px-4 py-2 rounded-lg z-50 focus:z-50 transition-all"
        >
          Skip to main content
        </a>

        {/* Loading overlay for better UX */}
        <div 
          id="page-loader" 
          className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[var(--homer-gold)] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[var(--homer-gold)] font-medium" style={{ fontFamily: 'Cinzel, serif' }}>
              Loading HOMER...
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
