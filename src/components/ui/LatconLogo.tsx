import { Nunito } from "next/font/google";
import { cn } from "@/lib/cn";

const nunito = Nunito({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

interface LatconLogoProps {
  className?: string;
  glow?: boolean;
  large?: boolean;
}

export function LatconLogo({ className, glow, large }: LatconLogoProps) {
  return (
    <span
      aria-label="Latcon Services"
      className={cn("inline-flex select-none flex-col items-end leading-none", nunito.className, className)}
      style={
        glow
          ? {
              filter:
                "drop-shadow(0 0 5px rgba(245,130,32,0.48)) drop-shadow(0 0 13px rgba(245,130,32,0.20))",
            }
          : undefined
      }
    >
      <span
        className={cn(
          "font-semibold tracking-[0.06em] text-accent",
          large ? "text-[23px]" : "text-[17px]",
        )}
      >
        LATCON
      </span>
      <span
        className={cn(
          "mt-[2px] font-medium tracking-[0.20em] text-neutral-500",
          large ? "text-[10.5px]" : "text-[8px]",
        )}
      >
        SERVICES
      </span>
    </span>
  );
}
