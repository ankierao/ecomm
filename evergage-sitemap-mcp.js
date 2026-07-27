/**
 * ============================================================================
 * SALESFORCE PERSONALIZATION — MCP SITEMAP (COPY THIS ENTIRE FILE)
 * ============================================================================
 * Dataset: H_DEV_TEST
 *
 * HOW TO DEPLOY:
 * 1. Select ALL content in this file (Ctrl+A)
 * 2. Copy (Ctrl+C)
 * 3. In MCP: Settings -> Site Map -> Sitemap JS
 * 4. Paste and Save/Publish
 *
 * Do NOT call Evergage.initSitemap() from the Next.js app — it overwrites MCP.
 *
 * MCP CATALOG — built-in Product fields (no setup needed on Attributes screen):
 *   name, url, price, imageUrl, inventoryCount are built into Product automatically.
 *   Settings -> Catalog and Profile Objects -> Product -> Attributes is for CUSTOM fields only.
 *   Do NOT add imageUrl there; sitemap sends it on catalog.Product.imageUrl directly.
 *
 * SITE MARKUP REQUIRED (already on ShopSphere):
 *   data-evg-product-image  = full product image URL (thumbnail)
 *   data-evg-product-stock  = inventory count
 *   data-evg-product-id, data-evg-product-name, data-evg-product-price, etc.
 *   data-evg-page="home"    = homepage root (required for home_hero_banner)
 *   <header id="header">    = site header (required for global_header_banner)
 *   #home-hero-banner       = homepage hero zone target
 *   #home-sub-hero          = homepage sub-hero zone target (Einstein recommendations)
 *
 * CONTENT ZONES (for MCP global templates):
 *   global_header_banner -> header#header (all pages)
 *   home_hero_banner     -> #home-hero-banner (home page only)
 *   home_sub_hero        -> #home-sub-hero (home page only)
 *
 * imageUrl IS CAPTURED ON:
 *   - View Item (product detail page)
 *   - Add To Cart (global click listener)
 * ============================================================================
 */
Evergage.init({
  cookieDomain: window.location.hostname,
}).then(function () {
  function getPathname() {
    return window.location.pathname;
  }

  function getCategoryFromPage() {
    var page = document.querySelector("[data-evg-page='category']");
    if (page) {
      return page.getAttribute("data-evg-category") || "all-products";
    }
    return (
      new URLSearchParams(window.location.search).get("category") ||
      "all-products"
    );
  }

  function getProductRoot() {
    return document.querySelector("[data-evg-product]");
  }

  function getProductAttribute(name) {
    var root = getProductRoot();
    return root ? root.getAttribute(name) || "" : "";
  }

  // Reads data-evg-product-image from DOM, falls back to <img> src
  function getProductImageFromElement(element) {
    if (!element) {
      return "";
    }

    var image = element.getAttribute("data-evg-product-image");
    if (image) {
      return image;
    }

    var img = element.querySelector("img");
    if (!img) {
      return "";
    }

    return img.getAttribute("src") || img.currentSrc || img.src || "";
  }

  // Builds full Product catalog object including imageUrl predefined attribute
  function buildProductCatalogFromElement(element, fallbackCategory) {
    if (!element) {
      return null;
    }

    var id = element.getAttribute("data-evg-product-id");
    var name = element.getAttribute("data-evg-product-name");

    if (!id || !name) {
      return null;
    }

    var slug = element.getAttribute("data-evg-product-slug") || "";
    var price = Number(element.getAttribute("data-evg-product-price") || 0);
    var brand = element.getAttribute("data-evg-product-brand") || "";
    var stock = Number(element.getAttribute("data-evg-product-stock") || 0);
    var category =
      element.getAttribute("data-evg-product-category") ||
      fallbackCategory ||
      "";
    var image = getProductImageFromElement(element);

    var product = {
      _id: id,
      name: name,
      price: price,
    };

    if (slug) {
      product.url = window.location.origin + "/products/" + slug;
    }

    if (image) {
      product.imageUrl = image;
    }

    if (stock > 0) {
      product.inventoryCount = stock;
    }

    if (category) {
      product.categories = [category];
    }

    var related = {};
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

  function getProductIdsFromCards() {
    var productIds = [];
    document.querySelectorAll("[data-evg-product-card]").forEach(function (card) {
      var id = card.getAttribute("data-evg-product-id");
      if (id) {
        productIds.push(id);
      }
    });
    return productIds;
  }

  // Waits for PDP markup, then reads a product attribute (fixes empty catalog on SPA)
  function getProductAttributeWhenReady(name) {
    if (document.querySelector("[data-evg-product]")) {
      return getProductAttribute(name);
    }
    return waitForProductDetailReady().then(function () {
      return getProductAttribute(name);
    });
  }

  function getProductImageWhenReady() {
    if (document.querySelector("[data-evg-product]")) {
      return getProductImageFromElement(getProductRoot());
    }
    return waitForProductDetailReady().then(function () {
      return getProductImageFromElement(getProductRoot());
    });
  }

  function getProductNumberWhenReady(name) {
    var result = getProductAttributeWhenReady(name);
    if (result && typeof result.then === "function") {
      return result.then(function (value) {
        return Number(value) || 0;
      });
    }
    return Number(result) || 0;
  }

  function resolveProductAttribute(value) {
    if (value && typeof value.then === "function") {
      return value;
    }
    return value;
  }

  // Upserts full Product catalog (imageUrl, price, etc.) for visible listing cards
  function syncVisibleProductsToCatalog(fallbackCategory) {
    document.querySelectorAll("[data-evg-product-card]").forEach(function (card) {
      var product = buildProductCatalogFromElement(card, fallbackCategory);
      if (!product || !product.imageUrl) {
        return;
      }

      Evergage.sendEvent({
        action: "View Page",
        catalog: {
          Product: product,
        },
      });
    });
  }

  function waitForElement(selector) {
    return Evergage.DisplayUtils.pageElementLoaded(selector, "html").then(
      function () {
        return true;
      }
    );
  }

  function waitForProductDetailReady() {
    return waitForElement("[data-evg-product]");
  }

  var sitemapConfig = {
    global: {
      onActionEvent: function (actionEvent) {
        if (actionEvent.action === "Viewed Category") {
          if (document.querySelector("[data-evg-product-card]")) {
            syncVisibleProductsToCatalog(getCategoryFromPage());
          } else {
            waitForElement("[data-evg-product-card]").then(function () {
              syncVisibleProductsToCatalog(getCategoryFromPage());
            });
          }
        }
        return actionEvent;
      },
      contentZones: [
        {
          name: "global_header_banner",
          selector: "header#header",
        },
      ],
      listeners: [
        Evergage.listener(
          "click",
          "[data-evg-action='add-to-cart']",
          function () {
            var productElement =
              this.closest("[data-evg-product]") ||
              this.closest("[data-evg-product-card]");
            // Sends imageUrl to Product catalog on Add To Cart
            var product = buildProductCatalogFromElement(
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
        itemAction: Evergage.ItemAction.ViewItem,
        isMatch: function () {
          if (!/^\/products\/[^/]+$/.test(getPathname())) {
            return false;
          }
          if (document.querySelector("[data-evg-product]")) {
            return true;
          }
          return waitForProductDetailReady();
        },
        catalog: {
          Product: {
            _id: function () {
              if (document.querySelector("[data-evg-product]")) {
                return getProductAttribute("data-evg-product-id") || false;
              }
              return waitForProductDetailReady().then(function () {
                return getProductAttribute("data-evg-product-id") || false;
              });
            },
            name: function () {
              return resolveProductAttribute(
                getProductAttributeWhenReady("data-evg-product-name")
              );
            },
            price: function () {
              return getProductNumberWhenReady("data-evg-product-price");
            },
            url: function () {
              var slugResult = getProductAttributeWhenReady("data-evg-product-slug");
              if (slugResult && typeof slugResult.then === "function") {
                return slugResult.then(function (slug) {
                  if (slug) {
                    return window.location.origin + "/products/" + slug;
                  }
                  return window.location.href;
                });
              }
              if (slugResult) {
                return window.location.origin + "/products/" + slugResult;
              }
              return window.location.href;
            },
            // Maps data-evg-product-image -> catalog.Product.imageUrl (predefined attribute)
            imageUrl: function () {
              return getProductImageWhenReady();
            },
            inventoryCount: function () {
              return getProductNumberWhenReady("data-evg-product-stock");
            },
            categories: function () {
              var categoryResult = getProductAttributeWhenReady(
                "data-evg-product-category"
              );
              if (categoryResult && typeof categoryResult.then === "function") {
                return categoryResult.then(function (category) {
                  return category ? [category] : [];
                });
              }
              return categoryResult ? [categoryResult] : [];
            },
            relatedCatalogObjects: {
              Brand: function () {
                var brandResult = getProductAttributeWhenReady(
                  "data-evg-product-brand"
                );
                if (brandResult && typeof brandResult.then === "function") {
                  return brandResult.then(function (brand) {
                    return brand ? [brand] : [];
                  });
                }
                return brandResult ? [brandResult] : [];
              },
              Category: function () {
                var categoryResult = getProductAttributeWhenReady(
                  "data-evg-product-category"
                );
                if (categoryResult && typeof categoryResult.then === "function") {
                  return categoryResult.then(function (category) {
                    return category ? [category] : [];
                  });
                }
                return categoryResult ? [categoryResult] : [];
              },
            },
          },
        },
      },
      {
        name: "category",
        action: "Viewed Category",
        itemAction: Evergage.ItemAction.ViewCategory,
        isMatch: function () {
          if (getPathname() !== "/products") {
            return false;
          }
          if (document.querySelector("[data-evg-page='category']")) {
            return true;
          }
          return waitForElement("[data-evg-page='category']");
        },
        catalog: {
          Category: {
            _id: function () {
              return getCategoryFromPage();
            },
            relatedCatalogObjects: {
              Product: function () {
                if (document.querySelector("[data-evg-product-card]")) {
                  return getProductIdsFromCards();
                }
                return waitForElement("[data-evg-product-card]").then(function () {
                  return getProductIdsFromCards();
                });
              },
            },
          },
        },
      },
      {
        name: "categories",
        action: "Viewed Categories",
        isMatch: function () {
          if (getPathname() !== "/categories") {
            return false;
          }
          if (document.querySelector("[data-evg-page='categories']")) {
            return true;
          }
          return waitForElement("[data-evg-page='categories']");
        },
      },
      {
        name: "cart",
        action: "View Cart",
        itemAction: Evergage.ItemAction.ViewCart,
        isMatch: function () {
          if (getPathname() !== "/cart") {
            return false;
          }
          if (document.querySelector("[data-evg-page='cart']")) {
            return true;
          }
          return waitForElement("[data-evg-page='cart']");
        },
      },
      {
        name: "wishlist",
        action: "View Wishlist",
        isMatch: function () {
          if (getPathname() !== "/wishlist") {
            return false;
          }
          if (document.querySelector("[data-evg-page='wishlist']")) {
            return true;
          }
          return waitForElement("[data-evg-page='wishlist']");
        },
      },
      {
        name: "home",
        action: "View Page",
        isMatch: function () {
          if (getPathname() !== "/" && getPathname() !== "") {
            return false;
          }
          if (document.querySelector("[data-evg-page='home']")) {
            return true;
          }
          return waitForElement("[data-evg-page='home']");
        },
        contentZones: [
          {
            name: "home_hero_banner",
            selector: "#home-hero-banner",
          },
          {
            name: "home_sub_hero",
            selector: "#home-sub-hero",
          },
        ],
      },
    ],
  };

  Evergage.initSitemap(sitemapConfig);

  var lastUrl = window.location.href;
  var lastReinitUrl = "";
  var reinitTimer = null;

  function scheduleReinit() {
    if (reinitTimer) {
      window.clearTimeout(reinitTimer);
    }

    reinitTimer = window.setTimeout(function () {
      var currentUrl = window.location.href;

      if (currentUrl === lastReinitUrl) {
        return;
      }

      lastReinitUrl = currentUrl;

      if (window.Evergage && window.Evergage.reinit) {
        window.Evergage.reinit();
      }
    }, 1000);
  }

  function onRouteChange() {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      scheduleReinit();
    }
  }

  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(history, arguments);
    onRouteChange();
  };

  history.replaceState = function () {
    originalReplaceState.apply(history, arguments);
    onRouteChange();
  };

  window.addEventListener("popstate", onRouteChange);
});
