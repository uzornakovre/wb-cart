import "../index.scss";
import {
  PRODUCTS_LIST,
  USER_DISCOUNT,
  PAYMENT_METHODS_LIST,
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
  immediatelyPaymentOption,
  cartFormSubmitElement,
  headerCounter,
  tabBarCounter,
  deliveryMethodsList,
  addressElements,
  deliveryTypeDetailsElement,
  deliveryTypeSummaryElement,
  pickupPointDetailsElement,
  USER_ADDRESSES_LIST,
  PICKUP_POINTS_ADDRESSES_LIST,
} from "../utils/constants";
import { Product } from "../components/product";
import { CartSection } from "../components/cart-section";
import ModalWithForm from "../components/modal-with-form";
import { ModalSection } from "../components/modal-section";
import { Card } from "../components/card";

// Общие переменные

let summaryCartItems = [];
let deliveryType = "courier";

// Модальные окна

const changeDeliveryType = (type) => {
  deliveryType = type;
  if (type === "courier") {
    deliverySection.clear();
    deliverySection.renderItems(USER_ADDRESSES_LIST);
  } else {
    deliverySection.clear();
    deliverySection.renderItems(PICKUP_POINTS_ADDRESSES_LIST);
  }
};

const submitPaymentForm = (paymentMethod) => {
  let currentMethod = PAYMENT_METHODS_LIST.find(
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
};

const submitDeliveryForm = (address) => {
  addressElements.forEach((elem) => {
    elem.textContent = address;
  });

  if (deliveryType === "courier") {
    deliveryTypeDetailsElement.textContent = "Курьером";
    deliveryTypeSummaryElement.textContent = "Доставка курьером";
    pickupPointDetailsElement.setAttribute("style", "visibility: hidden");
  } else {
    deliveryTypeDetailsElement.textContent = "Пункт выдачи";
    deliveryTypeSummaryElement.textContent = "Доставка в пункт выдачи";
    pickupPointDetailsElement.setAttribute("style", "visibility: visible");
  }

  deliveryMethodModal.close();
};

const paymentMethodModal = new ModalWithForm(
  paymentMethodModalElement,
  paymentForm,
  submitPaymentForm,
  null
);

const deliveryMethodModal = new ModalWithForm(
  deliveryMethodModalElement,
  deliveryForm,
  submitDeliveryForm,
  changeDeliveryType
);

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

const deliverySection = new ModalSection(
  {
    renderer: (itemData) => {
      return createDeliveryAddress(itemData);
    },
  },
  deliveryMethodsList
);

const createCardItem = (cardData) => {
  const cardItem = new Card(cardData, "#payment-method-template");
  const item = cardItem.createItem();
  return item;
};

const createDeliveryAddress = (deliveryData) => {
  const deliveryAddress = new DeliveryAddress(
    {
      address: deliveryData,
      handleDeleteClick: (id) => {
        deliveryAddress.removeItem(id);
      },
    },
    "#delivery-address-template"
  );
  const item = deliveryAddress.createItem();
  return item;
};

paymentMethodsSection.renderItems(PAYMENT_METHODS_LIST);
deliverySection.renderItems(USER_ADDRESSES_LIST);

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
import { declOfNum } from "../utils/decl-of-num";
import { Delivery, DeliveryAddress } from "../components/delivery-address";

const cartForm = new FormValidator(VALIDATION_SETTINGS, cartFormElement);

cartForm.enableValidation();

// Чекбоксы товаров

const handleCartItemsCheckboxes = () => {
  const checkAllCartItems = document.querySelector(".option");

  const getCartItemCheckboxes = () => {
    return () => document.querySelectorAll(".sub-option");
  };

  const getCheckedCount = () => {
    return () => document.querySelectorAll(".sub-option:checked").length;
  };

  const checkedCount = getCheckedCount();
  const cartItemCheckboxes = getCartItemCheckboxes();

  const renderCounter = () => {
    headerCounter.textContent = checkedCount();
    tabBarCounter.textContent = checkedCount();
  };

  const renderAllData = () => {
    renderCounter();
    getSummaryData();
    renderSummaryData();
  };

  renderCounter();

  cartItemCheckboxes().forEach((checkbox) => {
    checkbox.addEventListener("input", () => {
      if (checkedCount() < cartItemCheckboxes().length) {
        checkAllCartItems.checked = false;
      } else checkAllCartItems.checked = true;

      renderAllData();
    });
  });

  checkAllCartItems.addEventListener("input", () => {
    cartItemCheckboxes().forEach((checkbox) => {
      checkbox.checked = checkAllCartItems.checked;

      renderAllData();
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
  totalItems.textContent =
    totalItemsCount +
    " " +
    declOfNum(totalItemsCount, ["товар", "товара", "товаров"]);
};

renderSummaryData();

const toggleImmediatelyPaymentOption = () => {
  const { totalPrice, totalDiscount } = getSummaryData();
  const finalPrice = totalPrice - totalDiscount;

  if (immediatelyPaymentOption.checked) {
    cartFormSubmitElement.textContent = `Оплатить ${finalPrice.toLocaleString()} сом`;
  } else cartFormSubmitElement.textContent = "Заказать";
};

immediatelyPaymentOption.addEventListener(
  "change",
  toggleImmediatelyPaymentOption
);
