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

function readProductFromElement(element: Element | null) {
  if (!element) {
    return null;
  }

  const id = element.getAttribute("data-evg-product-id");
  const name = element.getAttribute("data-evg-product-name");
  const price = Number(element.getAttribute("data-evg-product-price") || 0);

  if (!id || !name) {
    return null;
  }

  return { id, name, price };
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

            const product = readProductFromElement(productElement);
            if (!product) {
              return;
            }

            Evergage.sendEvent({
              action: "Add To Cart",
              itemAction: Evergage.ItemAction.AddToCart,
              catalog: {
                Product: {
                  _id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                },
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
            imageUrl: () => getProductAttribute("data-evg-product-image"),
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

export function initEvergageSitemap(): boolean {
  const Evergage = window.Evergage;
  if (!Evergage?.initSitemap) {
    return false;
  }

  const config = createEvergageSitemapConfig(Evergage);
  Evergage.initSitemap(config);
  return true;
}

export function reinitEvergageSitemap(): void {
  window.Evergage?.reinit?.();
}
