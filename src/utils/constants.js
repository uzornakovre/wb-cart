import tShirtImg from "../images/item_1.jpg";
import caseImg from "../images/item_2.jpg";
import pencilsImg from "../images/item_3.jpg";

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
      registerNumber: 5167746237148,
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
      registerNumber: 5167746237148,
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
      registerNumber: 5167746237148,
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
      registerNumber: 5167746237148,
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
      registerNumber: 5167746237148,
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
      registerNumber: 5167746237148,
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
    logo: "./images/svg/mir-pay_icon.svg",
  },
  {
    id: "payment-method_2",
    name: "visa",
    card: "1234 56•• •••• 1234",
    date: "01/30",
    logo: "./images/svg/visa_icon.svg",
  },
  {
    id: "payment-method_3",
    name: "mastercard",
    card: "1234 56•• •••• 1234",
    date: "01/30",
    logo: "./images/svg/mastercard_icon.svg",
  },
  {
    id: "payment-method_4",
    name: "maestro",
    card: "1234 56•• •••• 1234",
    date: "01/30",
    logo: "./images/svg/maestro_icon.svg",
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
