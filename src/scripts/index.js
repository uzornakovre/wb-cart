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

const submitPaymentForm = (paymentMethod) => {
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
};

const submitDeliveryForm = (address) => {
  console.log(address);
  const currentAddress = ADDRESSES_LIST.find((ad) => ad.value === address);
  deliveryMethodModal.close();
  console.log(currentAddress);
};

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

const createCardItem = (cardData) => {
  const cardItem = new Card(cardData, "#payment-method-template");
  const item = cardItem.createItem();
  return item;
};

paymentMethodsSection.renderItems(PAYMENT_METHODS_LIST);

// Аккордеон

const handleCartProductsInStockAccordionButtonClick = () => {
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
};

const handleCartProductsOutOfStockAccordionButtonClick = () => {
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
};

cartProductsInStockAccordionButton.addEventListener(
  "click",
  handleCartProductsInStockAccordionButtonClick
);

cartProductsOutOfStockAccordionButton.addEventListener(
  "click",
  handleCartProductsOutOfStockAccordionButtonClick
);

// Переменные для итоговых данных

let summaryCartItems = [];

// Карточки товаров

const createCartItem = (itemData) => {
  const productItem = new Product(
    {
      productData: itemData,
      handleDeleteClick: (id) => {
        productItem.removeItem();
        summaryCartItems = summaryCartItems.filter(
          (item) => item._productId !== id
        );
        getSummaryData();
        renderSummaryData();
      },
      handleLikeClick: () => {
        productItem.toggleLike();
      },
      handleMinusClick: () => {
        productItem.decreaseCount();
        getSummaryData();
        renderSummaryData();
      },
      handlePlusClick: () => {
        productItem.increaseCount();
        getSummaryData();
        renderSummaryData();
      },
      userDiscount: USER_DISCOUNT,
    },
    "#product-template",
    "#out-of-stock-template"
  );

  summaryCartItems.push(productItem);
  const item = productItem.createItem();
  return item;
};

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

productSection.renderItems(PRODUCTS_LIST);
outOfStockSection.renderOutOfStockItems(PRODUCTS_LIST);

// Валидация полей ввода

import { VALIDATION_SETTINGS } from "../utils/constants";
import FormValidator from "../components/form-validator";

const cartForm = new FormValidator(VALIDATION_SETTINGS, cartFormElement);

cartForm.enableValidation();

// Чекбоксы товаров

const handleCartItemsCheckboxes = () => {
  const checkAllCartItems = document.querySelector(".option");
  const headerCounter = document.querySelector("#header-counter");

  const getCartItemCheckboxes = () => {
    return () => document.querySelectorAll(".sub-option");
  };

  const getCheckedCount = () => {
    return () => document.querySelectorAll(".sub-option:checked").length;
  };

  const checkedCount = getCheckedCount();
  const cartItemCheckboxes = getCartItemCheckboxes();

  cartItemCheckboxes().forEach((checkbox) => {
    checkbox.addEventListener("input", () => {
      if (checkedCount() < cartItemCheckboxes().length) {
        checkAllCartItems.checked = false;
      } else checkAllCartItems.checked = true;

      headerCounter.textContent = checkedCount();
      getSummaryData();
      renderSummaryData();
    });
  });

  checkAllCartItems.addEventListener("input", () => {
    cartItemCheckboxes().forEach((checkbox) => {
      checkbox.checked = checkAllCartItems.checked;
      headerCounter.textContent = checkedCount();
      getSummaryData();
      renderSummaryData();
    });
  });
};

handleCartItemsCheckboxes();

// Получение итоговых данных для корзины

const getSummaryData = () => {
  const data = {
    totalPrice: 0,
    totalDiscount: 0,
    totalItemsCount: 0,
  };

  summaryCartItems.forEach((item) => {
    let userDiscountValue = Math.floor(
      (item.productPrice / 100) * item.userDiscount
    );
    let productDiscountValue = Math.floor(
      (item.productPrice / 100) * item.productDiscount
    );
    let currentItemTotalDiscountValue =
      userDiscountValue + productDiscountValue;

    if (item._checkbox && item._checkbox.checked) {
      data.totalItemsCount += item.productCartCount;
      data.totalPrice += item.productPrice * item.productCartCount;
      data.totalDiscount +=
        currentItemTotalDiscountValue * item.productCartCount;
    }
  });

  return data;
};

// Отображение итоговых данных корзины

const renderSummaryData = () => {
  const finalPrice = document.querySelector("#summary-price-with-discount");
  const price = document.querySelector("#summary-price");
  const discount = document.querySelector("#summary-discount");
  const totalItems = document.querySelector("#summary-total-items");
  const { totalPrice, totalDiscount, totalItemsCount } = getSummaryData();

  finalPrice.textContent = (totalPrice - totalDiscount).toLocaleString();
  price.textContent = totalPrice.toLocaleString();
  discount.textContent = totalDiscount.toLocaleString();
  totalItems.textContent = totalItemsCount;
};

renderSummaryData();
