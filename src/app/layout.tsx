import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Cobblegames Rankings",
    template: "%s | Cobblegames Rankings",
  },
  description: "Competitive Cobblemon rankings, leaderboards, and player statistics for Cobblegames server.",
  keywords: ["cobblemon", "minecraft", "rankings", "hunger games", "duels", "leaderboard"],
  openGraph: {
    type: "website",
    siteName: "Cobblegames Rankings",
    title: "Cobblegames Rankings",
    description: "Competitive Cobblemon rankings and player statistics",
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
