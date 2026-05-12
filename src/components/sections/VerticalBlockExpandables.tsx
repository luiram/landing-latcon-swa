"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type VerticalBlockExpandablesProps = {
  useCases: readonly string[];
  components: readonly string[];
  blockId: string;
};

function ExpandableRow({
  id,
  label,
  items,
  open,
  onToggle,
}: {
  id: string;
  label: string;
  items: readonly string[];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `${id}-panel`;

  return (
    <div className="overflow-hidden rounded-xl border border-accent/22 bg-bg-panel/60 shadow-[0_1px_3px_rgba(245,130,32,0.05)]">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-accent/[0.04] sm:px-5 sm:py-4"
      >
        <span className="text-[0.9375rem] font-semibold leading-snug text-accent sm:text-base">{label}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-accent/75 transition-transform duration-300 ease-out motion-reduce:transition-none",
            open && "rotate-180 text-accent",
          )}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-accent/15 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
            <ul className="space-y-3 text-pretty sm:space-y-3.5">
              {items.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm leading-relaxed text-text-muted sm:text-[0.9375rem] sm:leading-[1.65]"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent/90 to-blue-mid-2/75 sm:mt-2.5"
                    aria-hidden
                  />
                  <span className="min-w-0 text-text-primary/92">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerticalBlockExpandables({ useCases, components, blockId }: VerticalBlockExpandablesProps) {
  const uid = useId().replace(/:/g, "");
  const base = `${blockId}-${uid}`;
  const [casosOpen, setCasosOpen] = useState(false);
  const [componentesOpen, setComponentesOpen] = useState(false);

  return (
    <div className="mt-6 w-full min-w-0 space-y-2.5 sm:mt-7 sm:space-y-3">
      <ExpandableRow
        id={`${base}-casos`}
        label="Casos de uso"
        items={useCases}
        open={casosOpen}
        onToggle={() => setCasosOpen((v) => !v)}
      />
      <ExpandableRow
        id={`${base}-componentes`}
        label="Componentes"
        items={components}
        open={componentesOpen}
        onToggle={() => setComponentesOpen((v) => !v)}
      />
    </div>
  );
}
