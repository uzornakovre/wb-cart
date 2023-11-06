export class Product {
  constructor(
    {
      productData,
      handleDeleteClick,
      handleLikeClick,
      handleMinusClick,
      handlePlusClick,
      userDiscount,
    },
    productTemplateSelector,
    outOfStockTemplateSelector
  ) {
    this._productId = productData.id;
    this._productName = productData.name;
    this._productImage = productData.image;
    this._productProperties = productData.properties;
    this._productStore = productData.store;
    this._productSellerName = productData.seller.name;
    this._productSellerFullName = productData.seller.fullName;
    this._productSellerRegisterNumber = productData.seller.registerNumber;
    this._productSellerAddress = productData.seller.address;
    this._productPrice = productData.price;
    this._productDiscount = productData.discount;
    this._productInStock = productData.inStock;
    this._productCartCount = productData.startCartCount;
    this._userDiscount = userDiscount;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleMinusClick = handleMinusClick;
    this._handlePlusClick = handlePlusClick;
    this._productTemplateSelector = productTemplateSelector;
    this._outOfStockTemplateSelector = outOfStockTemplateSelector;
  }

  _getProductTemplate() {
    const cartItem = document
      .querySelector(this._productTemplateSelector)
      .content.querySelector(".cart__item")
      .cloneNode(true);

    return cartItem;
  }

  _getOutOfStockProductTemplate() {
    const cartItem = document
      .querySelector(this._outOfStockTemplateSelector)
      .content.querySelector(".cart__item")
      .cloneNode(true);

    return cartItem;
  }

  _setEventListeners() {
    this._itemDeleteButton = this._element.querySelector(
      ".cart__item-button_type_remove"
    );
    this._likeButton = this._element.querySelector(
      ".cart__item-button_type_like"
    );
    this._minusButton = this._element.querySelector(
      ".cart__item-counter-button_type_minus"
    );
    this._plusButton = this._element.querySelector(
      ".cart__item-counter-button_type_plus"
    );

    this._itemDeleteButton.addEventListener("click", this._handleDeleteClick);
    this._likeButton.addEventListener("click", this._handleLikeClick);

    this._minusButton &&
      this._minusButton.addEventListener("click", this._handleMinusClick);
    this._plusButton &&
      this._plusButton.addEventListener("click", this._handlePlusClick);
  }

  _calculateTotalPrice() {
    const totalDiscount = this._productDiscount + this._userDiscount;
    const totalPrice =
      this._productPrice - (this._productPrice / 100) * totalDiscount;

    return totalPrice;
  }

  createItem() {
    this._totalPrice = this._calculateTotalPrice();

    if (this._productInStock) {
      this._element = this._getProductTemplate();
    } else {
      this._element = this._getOutOfStockProductTemplate();
    }

    this._setEventListeners();

    this._checkbox = this._element.querySelector(".checkbox__input");
    this._checkboxLabel = this._element.querySelector(".checkbox__label");
    this._image = this._element.querySelector(".cart__item-image");
    this._totalPriceValue = this._element.querySelector(
      ".cart__item-price-total-value"
    );
    this._price = this._element.querySelector(".cart__item-price-old");
    this._properties = this._element.querySelector(".cart__item-properties");
    this._warning = this._element.querySelector(".cart__item-warning");
    this._color = this._element.querySelector(
      ".cart__item-property_type_color"
    );
    this._size = this._element.querySelector(".cart__item-property_type_size");

    if (this._checkbox) {
      this._checkbox.id = this._productId;
      this._checkboxLabel.setAttribute("for", this._productId);
    }

    this._image.src = this._productImage;
    this._image.alt = `Изоборажение ${this._productName}`;
    !this._productInStock &&
      this._image.classList.add("cart__item-image_not-available");

    this._element.querySelector(".cart__item-name").textContent =
      this._productName;
    this._element.querySelector(".cart__item-store").textContent =
      this._productStore;
    this._element.querySelector(".cart__item-seller-name").textContent =
      this._productSellerName;
    this._totalPriceValue &&
      (this._totalPriceValue.textContent = this._totalPrice);
    this._price && (this._price.textContent = `${this._productPrice} сом`);

    this._counter = this._element.querySelector(".cart__item-counter-value");

    this._counter && (this._counter.textContent = this._productCartCount);

    if (this._totalPrice > 999999 && this._productInStock) {
      this._totalPriceValue.classList.add("cart__item-price-total-value_small");
    } else if (this._productInStock) {
      this._totalPriceValue.classList.remove(
        "cart__item-price-total-value_small"
      );
    }

    if (!this._productProperties) {
      this._properties.classList.add("cart__item-properties_empty");
    } else {
      this._properties.classList.remove("cart__item-properties_empty");
      this._productProperties.color &&
        (this._color.textContent = `Цвет: ${this._productProperties.color}`);
      this._productProperties.size &&
        (this._size.textContent = `Размер: ${this._productProperties.size}`);
    }

    if (this._productInStock > 3 || !this._productInStock) {
      this._warning.classList.add("cart__item-warning_empty");
    } else {
      this._warning.classList.remove("cart__item-warning_empty");
      this._warning.textContent = `Осталось ${this._productInStock} шт.`;
    }

    if (this._productInStock) {
      this._element.querySelector(".cart__item-seller-info-name").textContent =
        this._productSellerFullName;
      this._element.querySelector(
        ".cart__item-seller-info-text_register-number"
      ).textContent = `ОГРН: ${this._productSellerRegisterNumber}`;
      this._element.querySelector(
        ".cart__item-seller-info-text_address"
      ).textContent = this._productSellerAddress;
      this._element.querySelector(
        ".cart__item-price-discount_type_default"
      ).textContent = `Скидка ${this._productDiscount}%`;
      this._element.querySelector(
        ".cart__item-price-discount-value_type_default"
      ).textContent = `-${300} сом`;
      this._element.querySelector(
        ".cart__item-price-discount_type_user"
      ).textContent = `Скидка покупателя ${this._userDiscount}%`;
      this._element.querySelector(
        ".cart__item-price-discount-value_type_user"
      ).textContent = `-${30} сом`;
    }

    return this._element;
  }

  removeItem() {
    this._element.remove();
  }

  toggleLike() {
    this._likeButton = this._element.querySelector(
      ".cart__item-button_type_like"
    );

    if (
      !this._likeButton.classList.contains("cart__item-button_type_like-active")
    ) {
      this._likeButton.classList.add("cart__item-button_type_like-active");
    } else {
      this._likeButton.classList.remove("cart__item-button_type_like-active");
    }
  }

  increaseCount() {
    this._productCartCount++;
    this._renderProductCartCount();
  }

  decreaseCount() {
    this._productCartCount--;
    this._renderProductCartCount();
  }

  _renderProductCartCount() {
    this._counter.textContent = this._productCartCount;

    if (this._productCartCount === 0) {
      this._minusButton.setAttribute("disabled", true);
    } else {
      this._minusButton.removeAttribute("disabled");
    }

    if (this._productCartCount === this._productInStock) {
      this._plusButton.setAttribute("disabled", true);
    } else {
      this._plusButton.removeAttribute("disabled");
    }
  }
}
