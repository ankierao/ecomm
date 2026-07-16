export interface EvergageApi {
  init?: (config?: { cookieDomain?: string }) => Promise<void>;
  initSitemap: (config: EvergageSitemapConfig) => void;
  reinit?: () => void;
  getSitemapConfig?: () => EvergageSitemapConfig;
  getSitemapResult?: () => Record<string, unknown>;
  getCurrentPage?: () => Record<string, unknown>;
  listener: (
    event: string,
    selector: string,
    handler: (this: Element) => void
  ) => unknown;
  sendEvent: (event: Record<string, unknown>) => void;
  ItemAction: {
    AddToCart: string;
    ViewItem: string;
  };
}

export interface EvergageSitemapConfig {
  global?: Record<string, unknown>;
  pageTypeDefault?: {
    name: string;
    action?: string;
  };
  pageTypes: Array<Record<string, unknown>>;
}

declare global {
  interface Window {
    Evergage?: EvergageApi;
  }
}

export {};
