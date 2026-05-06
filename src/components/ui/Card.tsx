import { cn } from "@/lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-border-subtle bg-bg-panel p-6 shadow-[0_1px_3px_rgba(89,90,93,0.06)] transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-blue-mid-1/22 hover:shadow-[0_14px_44px_-22px_rgba(75,104,140,0.2),0_0_0_1px_rgba(86,123,165,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
