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
    const address = document
      .querySelector(this._templateSelector)
      .content.querySelector(".order-details__product")
      .cloneNode(true);

    return address;
  }

  createEarliestItem() {
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
