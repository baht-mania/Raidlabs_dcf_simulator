import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DCF Valuation Simulator",
  description: "33억원 매수가 기준 | 5개년 월별 매출/비용 예측",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
