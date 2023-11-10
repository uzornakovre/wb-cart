import { GENITIVE_CASE_MONTH_LIST } from "../utils/constants";

export class DeliveryProduct {
  constructor(product, templateSelector) {
    this._id = product.id;
    this._name = product._productName;
    this._image = product._productImage;
    this._count = product.productCartCount;
    this._delivery = product.delivery;
    this._templateSelector = templateSelector;
  }

  _getItemsTemplate() {
    const item = document
      .querySelector(this._templateSelector)
      .content.querySelector(".order-details__product")
      .cloneNode(true);

    return item;
  }

  _getDeliveryDates(from) {
    const earliestDate = new Date(from.date[0]).getDate();
    const lateDate = new Date(from.date[1]).getDate();
    const month = new Date(from.date[1]).getMonth();
    return `${earliestDate}—${lateDate} ${GENITIVE_CASE_MONTH_LIST[month]}`;
  }

  createEarliestItem() {
    document.querySelector("#earliest_date").textContent =
      this._getDeliveryDates(this._delivery[0]);
    this._element = this._getItemsTemplate();
    this._imageElement = this._element.querySelector(
      ".order-details__product-image"
    );
    this._counterElement = this._element.querySelector(".counter__value");

    this._imageElement.src = this._image;
    this._imageElement.setAttribute("alt", `Изображение ${this._name}`);

    if (this._delivery[0].items < this._count) {
      this._counterElement.textContent = this._delivery[0].items;
    } else this._counterElement.textContent = this._count;

    return this._element;
  }

  createLateItem() {
    document.querySelector("#late_date").textContent = this._getDeliveryDates(
      this._delivery[1]
    );
    this._element = this._getItemsTemplate();
    this._imageElement = this._element.querySelector(
      ".order-details__product-image"
    );
    this._counterElement = this._element.querySelector(".counter__value");

    this._imageElement.src = this._image;
    this._imageElement.setAttribute("alt", `Изображение ${this._name}`);
    this._counterElement.textContent = this._count - this._delivery[0].items;

    return this._element;
  }
}
