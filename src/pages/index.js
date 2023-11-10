import "../index.scss";
import {
  PRODUCTS_LIST,
  USER_DISCOUNT,
  PAYMENT_METHODS_LIST,
  USER_ADDRESSES_LIST,
  PICKUP_POINTS_ADDRESSES_LIST,
} from "../utils/mock-data";
import {
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
  earliestDeliveryItemList,
  lateDeliveryItemList,
} from "../utils/elements";
import {
  GENITIVE_CASE_MONTH_LIST,
  VALIDATION_SETTINGS,
} from "../utils/constants";
import FormValidator from "../components/form-validator";
import { Product } from "../components/product";
import { CartSection } from "../components/cart-section";
import ModalWithForm from "../components/modal-with-form";
import { ModalSection } from "../components/modal-section";
import { Card } from "../components/card";
import { declOfNum } from "../utils/decl-of-num";
import { DeliveryAddress } from "../components/delivery-address";
import { DeliveryProduct } from "../components/delivery-product";

// Общие переменные

let summaryCartItems = [];
let deliveryType = "courier";

// МОДАЛЬНЫЕ ОКНА

// Обработчик выбора метода доставки

const changeDeliveryType = (type) => {
  deliveryType = type;
  if (type === "courier") {
    deliveryAddressSection.clear();
    deliveryAddressSection.renderItems(USER_ADDRESSES_LIST);
  } else {
    deliveryAddressSection.clear();
    deliveryAddressSection.renderItems(PICKUP_POINTS_ADDRESSES_LIST);
  }
};

// Обработчик отправки формы выбора метода платежа

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

// Обработчик отправки формы выбора метода доставки

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

// Экзкмпляры модальных окон

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

// Слушатели событий в модальных окнах

paymentMethodModal.setEventListeners();
deliveryMethodModal.setEventListeners();

paymentEditButtons.forEach((button) => {
  button.addEventListener("click", () => paymentMethodModal.open());
});
deliveryEditButtons.forEach((button) => {
  button.addEventListener("click", () => deliveryMethodModal.open());
});

// Экземпляры секций (списков) в модальных окнах

const paymentMethodsSection = new ModalSection(
  {
    renderer: (itemData) => {
      return createCardItem(itemData);
    },
  },
  paymentMethodsList
);

const deliveryAddressSection = new ModalSection(
  {
    renderer: (itemData) => {
      return createDeliveryAddress(itemData);
    },
  },
  deliveryMethodsList
);

// Функции, отвечающие за наполнение секций модальных окон

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
deliveryAddressSection.renderItems(USER_ADDRESSES_LIST);

// АККОРДЕОН

// Обработчик раскрытия/закрытия списка товаров в наличии

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

// Обработчик раскрытия/закрытия списка отсутствующих товаров

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

// Слушатели событий для кнопок

cartProductsInStockAccordionButton.addEventListener(
  "click",
  handleCartProductsInStockAccordionButtonClick
);

cartProductsOutOfStockAccordionButton.addEventListener(
  "click",
  handleCartProductsOutOfStockAccordionButtonClick
);

// КАРТОЧКИ ТОВАРОВ

// Функция создания экземпляра элемента корзины (продукта)

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

// Функции создания экземпляров продуктов для отображения в блоке доставки

const createEarliestDeliveryItem = (product) => {
  const deliveryItem = new DeliveryProduct(product, "#products_for_delivery");
  const item = deliveryItem.createEarliestItem();
  return item;
};

const createLateDeliveryItem = (product) => {
  const deliveryItem = new DeliveryProduct(product, "#products_for_delivery");
  const item = deliveryItem.createLateItem();
  return item;
};

// Экзкмпляры секций (списков) в корзине

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

const deliveryEarliestSection = new CartSection(
  {
    renderer: (itemData) => {
      return createEarliestDeliveryItem(itemData);
    },
  },
  earliestDeliveryItemList
);

const deliveryLateSection = new CartSection(
  {
    renderer: (itemData) => {
      return createLateDeliveryItem(itemData);
    },
  },
  lateDeliveryItemList
);

// Получение списка товаров на доставку, скрытие заголовков при отсутсвии товаров

const getDeliveryItems = (items) => {
  let earliest = items.filter((i) => {
    if (i.delivery && i.delivery.length && i._checkbox.checked) return i;
  });

  let late = items.filter((i) => {
    if (i.delivery && i.delivery.length === 2 && i._checkbox.checked) return i;
  });

  if (!earliest.length) {
    document.querySelector("#earliest_date").textContent = "";
  }

  if (!late.length) {
    document.querySelector("#late_date").textContent = "";
  }
  return { earliest, late };
};

// Обработчик отображения товаров на доставку

const renderDeliveryItems = () => {
  deliveryEarliestSection.clear();
  deliveryEarliestSection.renderItems(
    getDeliveryItems(summaryCartItems).earliest
  );
  deliveryLateSection.clear();
  deliveryLateSection.renderItems(getDeliveryItems(summaryCartItems).late);
};

productSection.renderItems(PRODUCTS_LIST);
outOfStockSection.renderOutOfStockItems(PRODUCTS_LIST);

// Обработчик чекбоксов товаров

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
    earliestDate: new Date(summaryCartItems[0].delivery[0].date[0]).getDate(),
    lateDate: 0,
    month: "",
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

      item.delivery.forEach((del) => {
        del.date.forEach((d) => {
          if (data.lateDate < new Date(d).getDate()) {
            data.lateDate = new Date(d).getDate();
          }
          data.month = new Date(d).getMonth();
        });
      });
    }
  });

  return data;
};

// ИТОГОВЫЕ ДАННЫЕ ПО ЗАКАЗУ

// Отображение итоговых данных корзины

const renderSummaryData = () => {
  const finalPrice = document.querySelector("#summary-price-with-discount");
  const price = document.querySelector("#summary-price");
  const discount = document.querySelector("#summary-discount");
  const totalItems = document.querySelector("#summary-total-items");
  const deliveryDate = document.querySelector(".cart__summary-date");
  const {
    totalPrice,
    totalDiscount,
    totalItemsCount,
    earliestDate,
    lateDate,
    month,
  } = getSummaryData();

  finalPrice.textContent = (totalPrice - totalDiscount).toLocaleString();
  price.textContent = totalPrice.toLocaleString();
  discount.textContent = totalDiscount.toLocaleString();
  totalItems.textContent =
    totalItemsCount +
    " " +
    declOfNum(totalItemsCount, ["товар", "товара", "товаров"]);
  if (!month) {
    deliveryDate.textContent = "Выберите товар для рассчета времени доставки";
  } else {
    deliveryDate.textContent = `${earliestDate}-${lateDate} ${GENITIVE_CASE_MONTH_LIST[
      month
    ]?.slice(0, 3)}`;
  }

  renderDeliveryItems();
};

renderSummaryData();

// Переключение опции моментальной оплаты

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

// ВАЛИДАЦИЯ ПОЛЕЙ ВВОДА

const cartForm = new FormValidator(VALIDATION_SETTINGS, cartFormElement);

cartForm.enableValidation();
