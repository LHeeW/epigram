import Provider from "@/components/provider";
import "./globals.css";
import localFont from "next/font/local";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
