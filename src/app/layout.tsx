import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PPM Minhajul Haq - Pondok Pesantren Mahasiswa",
  description: "Mencetak Generasi Madani: Sarjana yang Mubaligh, Mubaligh yang Sarjana. Pesantren mahasiswa modern di Bandung dengan kurikulum berbasis Al-Qur'an dan Al-Hadits.",
  keywords: ["pesantren", "mahasiswa", "bandung", "islam", "quran", "hadits", "PPM", "minhajul haq"],
  authors: [{ name: "PPM Minhajul Haq" }],
  openGraph: {
    title: "PPM Minhajul Haq - Pondok Pesantren Mahasiswa",
    description: "Mencetak Generasi Madani: Sarjana yang Mubaligh, Mubaligh yang Sarjana.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-[#0a1f0d]`}>
        {children}
      </body>
    </html>
  );
}
