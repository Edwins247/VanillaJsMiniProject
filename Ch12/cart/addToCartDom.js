import { formatPrice, getElement } from "../utils.js";

const cartItemsEl = getElement('.cart-items');

const addToCartDom = ({id, name, price, image, amount}) => {
    const articleEl = document.createElement('article');
    articleEl.classList.add('cart-item');
    articleEl.setAttribute('data-id', id);
    articleEl.innerHTML = `
    <img src="${image}" class="cart-item-img" alt="${name}" />
            <div>
              <h4 class="cart-item-name">${name}</h4>
              <p class="cart-item-price">${formatPrice(price)}</p>
              <button class="cart-item-remove-btn" data-id="${id}">remove</button>
            </div>

            <div>
              <button class="cart-item-increase-btn" data-id="${id}">
                <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn" data-id="${id}">
                <i class="fas fa-chevron-down"></i>
              </button>
            </div>
    `;

    cartItemsEl.appendChild(articleEl);
}

export default addToCartDom;