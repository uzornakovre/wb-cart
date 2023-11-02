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
