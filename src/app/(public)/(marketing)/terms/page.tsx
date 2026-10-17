

import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | SwiftDrop",
  description:
    "Review the terms for using SwiftDrop's courier and last-mile logistics platform.",
};

export default function TermsPage() {
  return <TermsPageClient />;
}
