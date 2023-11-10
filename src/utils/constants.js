export const VALIDATION_SETTINGS = {
  formSelector: "#cart-form",
  inputSelector: ".order-details__input",
  errorSelector: ".order-details__input-error",
  submitButtonSelector: ".cart__submit-button",
  inputErrorClass: "order-details__input_error",
  inputTipClass: "order-details__input-error_tip",
  validationMessages: [
    {
      id: "firstname",
      valueMissing: "Укажите имя",
    },
    {
      id: "lastname",
      valueMissing: "Укажите фамилию",
    },
    {
      id: "email",
      valueMissing: "Укажите электронную почту",
      typeMismatch: "Проверьте адрес электронной почты",
    },
    {
      id: "phone",
      valueMissing: "Укажите номер телефона",
      patternMismatch: "Формат: +9 999 999 99 99",
    },
    {
      id: "inn",
      valueMissing: "Укажите ИНН",
      tooShort: "Проверьте ИНН",
      patternMismatch: "Проверьте ИНН",
    },
  ],
};

export const GENITIVE_CASE_MONTH_LIST = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
