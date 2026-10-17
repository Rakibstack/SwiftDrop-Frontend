import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About SwiftDrop | Smarter Delivery Operations",
  description:
    "Discover SwiftDrop's approach to connected courier operations, shipment visibility, and last-mile delivery management.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}