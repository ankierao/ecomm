"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { reinitEvergageSitemap } from "@/lib/evergage/sitemap";

const REINIT_DELAY_MS = 800;

/**
 * Re-triggers the MCP-hosted sitemap after Next.js client navigation.
 * Do NOT call initSitemap here — that would overwrite the sitemap deployed in MCP.
 */
export default function EvergageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      reinitEvergageSitemap();
    }, REINIT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, search]);

  return null;
}
