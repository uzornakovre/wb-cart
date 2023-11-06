import "../index.scss";
import {
  PRODUCTS_LIST,
  USER_DISCOUNT,
  PAYMENT_METHODS_LIST,
  ADDRESSES_LIST,
  paymentMethodModalElement,
  deliveryMethodModalElement,
  paymentForm,
  deliveryForm,
  paymentEditButtons,
  deliveryEditButtons,
  cartItemsList,
  cartItemsListOutOfStock,
  paymentMethodLogoElements,
  cardNumberElements,
  cardDateElements,
  paymentMethodsList,
} from "../utils/constants";
import { Product } from "../components/product";
import { CartSection } from "../components/cart-section";
import ModalWithForm from "../components/modal-with-form";
import { ModalSection } from "../components/modal-section";
import { Card } from "../components/card";

// Модальные окна

const paymentMethodModal = new ModalWithForm(
  paymentMethodModalElement,
  paymentForm,
  submitPaymentForm
);

const deliveryMethodModal = new ModalWithForm(
  deliveryMethodModalElement,
  deliveryForm,
  submitDeliveryForm
);

function submitPaymentForm(paymentMethod) {
  const currentMethod = PAYMENT_METHODS_LIST.find(
    (method) => method.name === paymentMethod
  );

  paymentMethodLogoElements.forEach((logo) => {
    logo.src = currentMethod.logo;
    logo.alt = `Логотип платежной системы ${currentMethod.name}`;
  });

  cardNumberElements.forEach((num) => {
    num.textContent = currentMethod.card;
  });

  cardDateElements.forEach((date) => {
    date.textContent = currentMethod.date;
  });

  paymentMethodModal.close();

  return currentMethod;
}

function submitDeliveryForm(address) {
  console.log(address);
  const currentAddress = ADDRESSES_LIST.find((ad) => ad.value === address);
  deliveryMethodModal.close();
  console.log(currentAddress);
}

paymentMethodModal.setEventListeners();
deliveryMethodModal.setEventListeners();

paymentEditButtons.forEach((button) => {
  button.addEventListener("click", () => paymentMethodModal.open());
});
deliveryEditButtons.forEach((button) => {
  button.addEventListener("click", () => deliveryMethodModal.open());
});

const paymentMethodsSection = new ModalSection(
  {
    renderer: (itemData) => {
      return createCardItem(itemData);
    },
  },
  paymentMethodsList
);

function createCardItem(cardData) {
  const cardItem = new Card(cardData, "#payment-method-template");
  const item = cardItem.createItem();
  return item;
}

paymentMethodsSection.renderItems(PAYMENT_METHODS_LIST);

// Карточки товаров

const productSection = new CartSection(
  {
    renderer: (itemData) => {
      return createCartItem(itemData);
    },
  },
  cartItemsList
);

const outOfStockSection = new CartSection(
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
