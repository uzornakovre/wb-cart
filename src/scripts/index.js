import "../index.scss";
import { PRODUCTS_LIST, USER_DISCOUNT } from "../utils/constants";
import { Product } from "../components/product";
import { Cart } from "../components/cart";

export const cartItemsList = document.querySelector(".cart__items-list");
export const cartItemsListOutOfStock = document.querySelector(
  ".cart__items-list_out-of-stock"
);

const productSection = new Cart(
  {
    renderer: (itemData) => {
      return createCartItem(itemData);
    },
  },
  cartItemsList
);

const outOfStockSection = new Cart(
  {
    renderer: (itemData) => {
      return createCartItem(itemData);
    },
  },
  cartItemsListOutOfStock
);

function createCartItem(itemData) {
  const productItem = new Product(
    itemData,
    USER_DISCOUNT,
    "#product-template",
    "#out-of-stock-template"
  );

  const item = productItem.createItem();
  return item;
}

productSection.renderItems(PRODUCTS_LIST);
outOfStockSection.renderOutOfStockItems(PRODUCTS_LIST);
