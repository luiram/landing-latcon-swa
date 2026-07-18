import type { Metadata } from "next";
import { HomePageBody } from "@/components/pages/HomePageBody";
import { buildAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: buildAlternates("home", "en"),
};

export default function Page() {
  return <HomePageBody locale="en" />;
}
