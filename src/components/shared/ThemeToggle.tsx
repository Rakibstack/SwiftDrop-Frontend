"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme.provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Toggle theme"
          />
        }
      >
        {resolvedTheme === "dark" ? (
          <Moon className="size-[18px]" />
        ) : (
          <Sun className="size-[18px]" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-36 rounded-2xl border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Theme
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={`rounded-xl px-3 py-2.5 ${theme === "light" ? "bg-secondary" : ""}`}
          >
            <Sun className="size-4" />
            Light
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={`rounded-xl px-3 py-2.5 ${theme === "dark" ? "bg-secondary" : ""}`}
          >
            <Moon className="size-4" />
            Dark
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={`rounded-xl px-3 py-2.5 ${theme === "system" ? "bg-secondary" : ""}`}
          >
            <Monitor className="size-4" />
            System
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
