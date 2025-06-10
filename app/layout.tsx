import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joneyxiao.github.io/yuanfen'),
  title: "缘份婚庆 | Yuanfen Wedding Planning - Premium Wedding Services Since 2012",
  description: "Create unforgettable lifetime moments with Yuanfen Wedding Planning. Premium wedding services including planning, venues, dresses, and transportation in China since 2012.",
  keywords: ["wedding planning", "婚庆", "婚礼策划", "缘份婚庆", "wedding venue", "wedding dress", "wedding photography"],
  authors: [{ name: "Yuanfen Wedding Planning Co., Ltd" }],
  creator: "Yuanfen Wedding Planning",
  publisher: "Yuanfen Wedding Planning",
  openGraph: {
    title: "缘份婚庆 | Premium Wedding Planning Services",
    description: "Create unforgettable lifetime moments with our premium wedding planning services since 2012",
    url: "https://yuanfen-wedding.github.io",
    siteName: "Yuanfen Wedding Planning",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yuanfen Wedding Planning - Premium Wedding Services"
      }
    ],
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "缘份婚庆 | Premium Wedding Planning Services",
    description: "Create unforgettable lifetime moments with our premium wedding planning services since 2012",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#e83e8c',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#e83e8c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-body`}
      >
        {children}
      </body>
    </html>
  );
}
