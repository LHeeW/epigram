import Providers from "@/components/providers";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

const iropkeBatang = localFont({
  src: "../fonts/IropkeBatangM.otf",
  variable: "--font-batang",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${iropkeBatang.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
