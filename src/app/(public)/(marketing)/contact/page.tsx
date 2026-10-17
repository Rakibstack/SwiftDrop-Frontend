
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | SwiftDrop",
  description:
    "Get in touch with SwiftDrop for delivery support, product feedback, and partnership inquiries.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}