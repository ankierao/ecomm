import type { EvergageApi, EvergageSitemapConfig } from "./types";

function getPathname(): string {
  return window.location.pathname;
}

function getCategoryFromPage(): string {
  const pageCategory = document
    .querySelector("[data-evg-page='category']")
    ?.getAttribute("data-evg-category");

  if (pageCategory) {
    return pageCategory;
  }

  return new URLSearchParams(window.location.search).get("category") || "all-products";
}

function getProductRoot(): Element | null {
  return document.querySelector("[data-evg-product]");
}

function getProductAttribute(name: string): string {
  return getProductRoot()?.getAttribute(name) || "";
}

function getProductImageFromElement(element: Element | null): string {
  if (!element) {
    return "";
  }

  const image = element.getAttribute("data-evg-product-image");
  if (image) {
    return image;
  }

  const img = element.querySelector("img");
  if (!img) {
    return "";
  }

  return img.getAttribute("src") || img.currentSrc || img.src || "";
}

function buildProductCatalogFromElement(
  element: Element | null,
  fallbackCategory?: string
) {
  if (!element) {
    return null;
  }

  const id = element.getAttribute("data-evg-product-id");
  const name = element.getAttribute("data-evg-product-name");

  if (!id || !name) {
    return null;
  }

  const slug = element.getAttribute("data-evg-product-slug") || "";
  const price = Number(element.getAttribute("data-evg-product-price") || 0);
  const brand = element.getAttribute("data-evg-product-brand") || "";
  const category =
    element.getAttribute("data-evg-product-category") ||
    fallbackCategory ||
    "";
  const image = getProductImageFromElement(element);

  const product: Record<string, unknown> = {
    _id: id,
    name,
    price,
  };

  if (slug) {
    product.url = `${window.location.origin}/products/${slug}`;
  }

  if (image) {
    product.imageUrl = image;
  }

  if (category) {
    product.categories = [category];
  }

  const related: Record<string, string[]> = {};
  if (brand) {
    related.Brand = [brand];
  }
  if (category) {
    related.Category = [category];
  }
  if (Object.keys(related).length > 0) {
    product.relatedCatalogObjects = related;
  }

  return product;
}

export function createEvergageSitemapConfig(
  Evergage: EvergageApi
): EvergageSitemapConfig {
  return {
    global: {
      listeners: [
        Evergage.listener(
          "click",
          "[data-evg-action='add-to-cart']",
          function (this: Element) {
            const productElement =
              this.closest("[data-evg-product]") ||
              this.closest("[data-evg-product-card]");

            const product = buildProductCatalogFromElement(
              productElement,
              getCategoryFromPage()
            );
            if (!product) {
              return;
            }

            product.quantity = 1;

            Evergage.sendEvent({
              action: "Add To Cart",
              itemAction: Evergage.ItemAction.AddToCart,
              catalog: {
                Product: product,
              },
            });
          }
        ),
      ],
    },

    pageTypeDefault: {
      name: "default",
    },

    pageTypes: [
      {
        name: "product_detail",
        action: "View Item",
        isMatch: () => /^\/products\/[^/]+$/.test(getPathname()),
        catalog: {
          Product: {
            _id: () => getProductAttribute("data-evg-product-id") || false,
            name: () => getProductAttribute("data-evg-product-name"),
            price: () =>
              Number(getProductAttribute("data-evg-product-price")) || 0,
            url: () => window.location.href,
            imageUrl: () => getProductImageFromElement(getProductRoot()),
            relatedCatalogObjects: {
              Brand: () => {
                const brand = getProductAttribute("data-evg-product-brand");
                return brand ? [brand] : [];
              },
              Category: () => {
                const category = getProductAttribute("data-evg-product-category");
                return category ? [category] : [];
              },
            },
          },
        },
      },
      {
        name: "category",
        action: "Viewed Category",
        isMatch: () => getPathname() === "/products",
        catalog: {
          Category: {
            _id: () => getCategoryFromPage(),
          },
        },
      },
      {
        name: "categories",
        action: "Viewed Categories",
        isMatch: () => getPathname() === "/categories",
      },
      {
        name: "cart",
        action: "View Cart",
        isMatch: () => getPathname() === "/cart",
      },
      {
        name: "wishlist",
        action: "View Wishlist",
        isMatch: () => getPathname() === "/wishlist",
      },
      {
        name: "home",
        action: "View Page",
        isMatch: () => getPathname() === "/" || getPathname() === "",
      },
    ],
  };
}

/**
 * Reference mirror of evergage-sitemap-mcp.js (TypeScript types only).
 * MCP deployment: copy evergage-sitemap-mcp.js -> Settings -> Site Map -> Sitemap JS
 * Do NOT init sitemap from the app — it overwrites MCP config.
 */
export function initEvergageSitemap(): boolean {
  return Boolean(window.Evergage?.initSitemap);
}

export function reinitEvergageSitemap(): void {
  window.Evergage?.reinit?.();
}
