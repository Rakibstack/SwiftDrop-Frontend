import { ArrowUpRight, Mail, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import Logo from "./Logo";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Shipment Management", href: "/#services" },
      { label: "Tracking", href: "/tracking" },
      { label: "Rider Operations", href: "/#operations" },
      { label: "Payments", href: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Operations", href: "/#operations" },
      { label: "About", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Track Shipment", href: "/tracking" },
      { label: "Get Started", href: "/register" },
      { label: "Login", href: "/login" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.4fr_2fr] lg:gap-20 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A modern courier and last-mile logistics platform built to make
              shipping operations simpler, faster, and more connected.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5 text-primary" />
                Bangladesh
              </div>

              <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                <Mail className="size-3.5 text-primary" />
                support@swiftdrop.com
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-2">
              <SocialLink
                href="https://github.com"
                label="GitHub"
                icon={FaGithub}
              />

              <SocialLink
                href="https://linkedin.com"
                label="LinkedIn"
                icon={FaLinkedinIn}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">
                  {group.title}
                </h3>

                <ul className="mt-5 space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}

                        {link.label === "Track Shipment" && (
                          <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SwiftDrop. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Package className="size-3.5 text-primary" />
              Built for better deliveries
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* -------------------------------- */
/* Social Link                      */
/* -------------------------------- */

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

const SocialLink = ({ href, label, icon: Icon }: SocialLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-xl border border-border bg-secondary/40 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="size-4" />
    </Link>
  );
};

export default Footer;
