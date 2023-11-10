export const cartFormElement = document.querySelector("#cart-form");
export const cartFormSubmitElement = document.querySelector(
  ".cart__submit-button"
);
export const immediatelyPaymentOption =
  document.querySelector("#pay_immediately");
export const cartItemsList = document.querySelector(".cart__items-list");
export const cartItemsListOutOfStock = document.querySelector(
  ".cart__items-list_out-of-stock"
);

export const paymentEditButtons = document.querySelectorAll(".payment-edit");
export const deliveryEditButtons = document.querySelectorAll(".delivery-edit");

export const paymentMethodModalElement = document.querySelector(
  ".modal_type_payment-method"
);
export const deliveryMethodModalElement = document.querySelector(
  ".modal_type_delivery-method"
);
export const paymentForm = paymentMethodModalElement.querySelector("#payment");
export const deliveryForm =
  deliveryMethodModalElement.querySelector("#delivery");

export const paymentMethodsList = paymentMethodModalElement.querySelector(
  ".modal__list_type_payment-method"
);
export const deliveryMethodsList = deliveryMethodModalElement.querySelector(
  ".modal__list_type_delivery-method"
);

export const paymentMethodLogoElements =
  document.querySelectorAll(".current-card-logo");
export const cardNumberElements = document.querySelectorAll(
  ".current-card-number"
);
export const cardDateElements = document.querySelectorAll(".current-card-date");
export const addressElements = document.querySelectorAll(".current-address");
export const deliveryTypeDetailsElement = document.querySelector(
  ".delivery-type_details"
);
export const pickupPointDetailsElement = document.querySelector(
  ".current-address__info"
);
export const deliveryTypeSummaryElement = document.querySelector(
  ".delivery-type_summary"
);
export const earliestDeliveryItemList =
  document.querySelector("#earliest_list");
export const lateDeliveryItemList = document.querySelector("#late_list");
export const cartProductsInStockAccordionButton =
  document.querySelector("#in-stock");
export const cartProductsOutOfStockAccordionButton =
  document.querySelector("#out-of-stock");
export const headerCounter = document.querySelector("#header-counter");
export const tabBarCounter = document.querySelector("#tab-bar-counter");
