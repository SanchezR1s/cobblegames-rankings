import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cobblemon Arena - Rankings",
    template: "%s | Cobblemon Arena",
  },
  description: "Clasificación competitiva de jugadores en Cobblemon Arena — Hunger Games y Duelos.",
  keywords: ["cobblemon", "minecraft", "rankings", "hunger games", "duels", "leaderboard", "cobblemon arena"],
  openGraph: {
    type: "website",
    siteName: "Cobblemon Arena",
    title: "Cobblemon Arena - Rankings",
    description: "Clasificación competitiva de Cobblemon Arena",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
