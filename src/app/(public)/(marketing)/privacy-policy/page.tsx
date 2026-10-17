
import type { Metadata } from "next";
import PrivacyPolicyClient from "./PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | SwiftDrop",
  description:
    "Learn how SwiftDrop handles personal information, account data, and shipment-related information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
