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
  cartFormElement,
  cartProductsInStockAccordionButton,
  cartProductsOutOfStockAccordionButton,
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

// Аккордеон

function handleCartProductsInStockAccordionButtonClick() {
  if (!cartItemsList.classList.contains("cart__items-list_visible")) {
    cartItemsList.classList.add("cart__items-list_visible");
    cartProductsInStockAccordionButton.classList.remove(
      "cart__arrow_direction_up"
    );
  } else {
    cartItemsList.classList.remove("cart__items-list_visible");
    cartProductsInStockAccordionButton.classList.add(
      "cart__arrow_direction_up"
    );
  }
}

function handleCartProductsOutOfStockAccordionButtonClick() {
  if (!cartItemsListOutOfStock.classList.contains("cart__items-list_visible")) {
    cartItemsListOutOfStock.classList.add("cart__items-list_visible");
    cartProductsOutOfStockAccordionButton.classList.remove(
      "cart__arrow_direction_up"
    );
  } else {
    cartItemsListOutOfStock.classList.remove("cart__items-list_visible");
    cartProductsOutOfStockAccordionButton.classList.add(
      "cart__arrow_direction_up"
    );
  }
}

cartProductsInStockAccordionButton.addEventListener(
  "click",
  handleCartProductsInStockAccordionButtonClick
);

cartProductsOutOfStockAccordionButton.addEventListener(
  "click",
  handleCartProductsOutOfStockAccordionButtonClick
);

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
    {
      productData: itemData,
      handleDeleteClick: () => {
        productItem.removeItem();
      },
      handleLikeClick: () => {
        productItem.toggleLike();
      },
      handleMinusClick: () => {
        productItem.decreaseCount();
      },
      handlePlusClick: () => {
        productItem.increaseCount();
      },
      userDiscount: USER_DISCOUNT,
    },
    "#product-template",
    "#out-of-stock-template"
  );

  const item = productItem.createItem();
  return item;
}

productSection.renderItems(PRODUCTS_LIST);
outOfStockSection.renderOutOfStockItems(PRODUCTS_LIST);

// Валидация полей ввода

import { VALIDATION_SETTINGS } from "../utils/constants";

import FormValidator from "../components/form-validator";

const cartForm = new FormValidator(VALIDATION_SETTINGS, cartFormElement);

cartForm.enableValidation();
