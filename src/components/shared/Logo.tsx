
import Link from "next/link";
import { Package } from "lucide-react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="group flex w-fit items-center gap-2.5"
      aria-label="SwiftDrop home"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
        <Package className="size-5" strokeWidth={2.2} />
      </span>

      <span className="text-xl font-bold tracking-tight text-foreground">
        Swift<span className="text-primary">Drop</span>
      </span>
    </Link>
  );
};

export default Logo;