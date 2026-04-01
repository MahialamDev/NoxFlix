import "./globals.css";
import Navbar from "@/components/Navbar";
import AgeGate from "@/components/AgeGate";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://noxflix.vercel.app"),
  title: "NoxFlix — All Movies",
  description: "Premium adult cinema. Thrillers, horror, sci-fi and more.",
  openGraph: {
    title: "NoxFlix — All Movies",
    description: "Premium adult cinema. Thrillers, horror, sci-fi and more.",
    siteName: "NoirFlix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoxFlix — All Movies",
    description: "Premium adult cinema. Thrillers, horror, sci-fi and more.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AgeGate>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AgeGate>
      </body>
    </html>
  );
}
