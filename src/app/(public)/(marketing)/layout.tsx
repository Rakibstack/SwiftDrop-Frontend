import type { ReactNode } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import PublicAIChatWidget from "@/components/public-ai-support/PublicAIChatWidget";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <PublicAIChatWidget></PublicAIChatWidget>
      <Footer></Footer>
    </div>
  );
}
