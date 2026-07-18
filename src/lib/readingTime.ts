import type { BlogBlock } from "@/config/blog";

const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(body: ReadonlyArray<BlogBlock>): number {
  const wordCount = body.reduce((count, block) => {
    const text = block.type === "list" ? block.items.join(" ") : block.text;
    return count + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
