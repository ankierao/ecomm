/**
 * Salesforce Personalization -> Site Map -> Sitemap JS
 * Dataset: H_DEV_TEST
 *
 * Requires data-evg-* attributes already present in the ShopSphere Next.js site.
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

  function readProductFromElement(element) {
    if (!element) {
      return null;
    }

    var id = element.getAttribute("data-evg-product-id");
    var name = element.getAttribute("data-evg-product-name");
    var price = Number(element.getAttribute("data-evg-product-price") || 0);

    if (!id || !name) {
      return null;
    }

    return { id: id, name: name, price: price };
  }

  function waitForElement(selector) {
    return Evergage.DisplayUtils.pageElementLoaded(selector, "html").then(
      function () {
        return true;
      }
    );
  }

  var sitemapConfig = {
    global: {
      onActionEvent: function (actionEvent) {
        return actionEvent;
      },
      listeners: [
        Evergage.listener(
          "click",
          "[data-evg-action='add-to-cart']",
          function () {
            var productElement =
              this.closest("[data-evg-product]") ||
              this.closest("[data-evg-product-card]");
            var product = readProductFromElement(productElement);

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
        itemAction: Evergage.ItemAction.ViewItem,
        isMatch: function () {
          if (!/^\/products\/[^/]+$/.test(getPathname())) {
            return false;
          }
          if (document.querySelector("[data-evg-product]")) {
            return true;
          }
          return waitForElement("[data-evg-product]");
        },
        catalog: {
          Product: {
            _id: function () {
              return getProductAttribute("data-evg-product-id") || false;
            },
            name: function () {
              return getProductAttribute("data-evg-product-name");
            },
            price: function () {
              return Number(getProductAttribute("data-evg-product-price")) || 0;
            },
            url: function () {
              return window.location.href;
            },
            imageUrl: function () {
              return getProductAttribute("data-evg-product-image");
            },
            relatedCatalogObjects: {
              Brand: function () {
                var brand = getProductAttribute("data-evg-product-brand");
                return brand ? [brand] : [];
              },
              Category: function () {
                var category = getProductAttribute("data-evg-product-category");
                return category ? [category] : [];
              },
            },
          },
        },
      },
      {
        name: "category",
        action: "Viewed Category",
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
      },
    ],
  };

  Evergage.initSitemap(sitemapConfig);

  // Next.js client-side navigation support
  var lastUrl = window.location.href;
  var reinitTimer = null;

  function scheduleReinit() {
    if (reinitTimer) {
      window.clearTimeout(reinitTimer);
    }
    reinitTimer = window.setTimeout(function () {
      if (window.Evergage && window.Evergage.reinit) {
        window.Evergage.reinit();
      }
    }, 500);
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
