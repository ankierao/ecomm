"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initEvergageSitemap, reinitEvergageSitemap } from "@/lib/evergage/sitemap";

const INIT_RETRY_MS = 250;
const REINIT_DELAY_MS = 500;

export default function EvergageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);
  const search = searchParams.toString();

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    const tryInit = () => {
      if (!initialized.current && initEvergageSitemap()) {
        initialized.current = true;
        reinitEvergageSitemap();
      }
    };

    tryInit();

    const intervalId = window.setInterval(() => {
      tryInit();
      if (initialized.current) {
        window.clearInterval(intervalId);
      }
    }, INIT_RETRY_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      reinitEvergageSitemap();
    }, REINIT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pathname, search]);

  return null;
}
