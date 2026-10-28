import type { Metadata } from "next";
import { portfolio } from "@/content";
import { CvView } from "@/components/CvView";

// Unlisted working tool: reachable at /cv but kept out of search indexes
// and not linked from the site navigation.
export const metadata: Metadata = {
  title: "CV working copy",
  robots: { index: false, follow: false },
};

export default function CvPage() {
  return <CvView data={portfolio} />;
}
