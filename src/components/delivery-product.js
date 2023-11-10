export class DeliveryProduct {
  constructor(product, templateSelector) {
    this._id = product.id;
    this._name = product._productName;
    this._image = product._productImage;
    this._count = product.productCartCount;
    this._templateSelector = templateSelector;
  }

  _getAddressTemplate() {
    const address = document
      .querySelector(this._templateSelector)
      .content.querySelector(".order-details__product")
      .cloneNode(true);

    return address;
  }

  createItem() {
    this._element = this._getAddressTemplate();

    this._imageElement = this._element.querySelector(
      ".order-details__product-image"
    );
    this._counterElement = this._element.querySelector(".counter__value");

    this._imageElement.src = this._image;
    this._imageElement.setAttribute("alt", `Изображение ${this._name}`);
    this._counterElement.textContent = this._count;

    return this._element;
  }
}
