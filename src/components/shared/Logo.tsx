
import Link from "next/link";
import { Package } from "lucide-react";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      className="group flex w-fit items-center gap-2.5"
      aria-label="SwiftDrop home"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6">
        <Image
          src="/logo.png"
          alt="SwiftDrop Logo"
          width={28}
          height={28}
        />
      </span>

      <span className="text-xl font-bold tracking-tight text-foreground">
        Swift<span className="text-primary">Drop</span>
      </span>
    </Link>
  );
};

export default Logo;