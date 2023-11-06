import tShirtImg from "../images/item_1.jpg";
import caseImg from "../images/item_2.jpg";
import pencilsImg from "../images/item_3.jpg";
import mirLogo from "../images/svg/mir-pay_icon.svg";
import visaLogo from "../images/svg/visa_icon.svg";
import masterCardLogo from "../images/svg/mastercard_icon.svg";
import maestroLogo from "../images/svg/maestro_icon.svg";

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

export const PRODUCTS_LIST = [
  {
    id: "prod-1",
    name: "Футболка UZcotton мужская",
    image: tShirtImg,
    properties: {
      color: "белый",
      size: "56",
    },
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      fullName: "OOO «Вайлдберриз»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 1305,
    discount: 50,
    count: 2,
  },
  {
    id: "prod-2",
    name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    image: caseImg,
    properties: {
      color: "прозрачный",
    },
    store: "Коледино WB",
    seller: {
      name: "ООО Мегапрофстиль",
      fullName: "OOO «МЕГАПРОФСТИЛЬ»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 15000000,
    discount: 55,
    count: 300,
  },
  {
    id: "prod-3",
    name: 'Карандаши цветные Faber\u2011Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber\u2011Castell',
    image: pencilsImg,
    properties: null,
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      fullName: "OOO «МЕГАПРОФСТИЛЬ»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 950,
    discount: 20,
    count: 2,
  },
  {
    id: "prod-4",
    name: "Футболка UZcotton мужская",
    image: tShirtImg,
    properties: {
      color: "белый",
      size: "56",
    },
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      fullName: "OOO «Вайлдберриз»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 1305,
    discount: 50,
    count: 0,
  },
  {
    id: "prod-5",
    name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    image: caseImg,
    properties: {
      color: "прозрачный",
    },
    store: "Коледино WB",
    seller: {
      name: "ООО Мегапрофстиль",
      fullName: "OOO «МЕГАПРОФСТИЛЬ»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 15000000,
    discount: 55,
    count: 0,
  },
  {
    id: "prod-6",
    name: 'Карандаши цветные Faber\u2011Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber\u2011Castell',
    image: pencilsImg,
    properties: null,
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      fullName: "OOO «МЕГАПРОФСТИЛЬ»",
      registerNumber: "5167746237148",
      address:
        "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    price: 950,
    discount: 20,
    count: 0,
  },
];

export const USER_DISCOUNT = 10;

export const PAYMENT_METHODS_LIST = [
  {
    id: "payment-method_1",
    name: "mir",
    card: "1234 56•• •••• 1234",
    date: "01/30",
    logo: mirLogo,
  },
  {
    id: "payment-method_2",
    name: "visa",
    card: "2345 56•• •••• 1234",
    date: "02/30",
    logo: visaLogo,
  },
  {
    id: "payment-method_3",
    name: "mastercard",
    card: "3456 56•• •••• 1234",
    date: "03/30",
    logo: masterCardLogo,
  },
  {
    id: "payment-method_4",
    name: "maestro",
    card: "4567 56•• •••• 1234",
    date: "04/30",
    logo: maestroLogo,
  },
];

export const ADDRESSES_LIST = [
  {
    id: "address_1",
    value: "Бишкек, улица Табышалиева, 57",
    type: "courier",
  },
  {
    id: "address_2",
    value: "Бишкек, улица Жукеева-Пудовкина, 77/1",
    type: "courier",
  },
  {
    id: "address_3",
    value: "Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1",
    type: "courier",
  },
  {
    id: "address_1",
    value: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    type: "pickup-point",
  },
  {
    id: "address_2",
    value: "г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1",
    type: "pickup-point",
  },
  {
    id: "address_3",
    value: "г. Бишкек, улица Табышалиева, д. 57",
    type: "pickup-point",
  },
];
