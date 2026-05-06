import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border-subtle bg-bg-elevated/90 px-3 py-1 text-xs font-medium text-text-muted transition-colors duration-200",
        "hover:border-accent/28 hover:bg-bg-elevated hover:text-text-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}
