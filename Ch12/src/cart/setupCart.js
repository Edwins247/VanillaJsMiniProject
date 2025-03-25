import { findProduct } from '../../store.js';
import { formatPrice, getElement, getStorageItem, setStorageItem } from '../../utils.js';
import addToCartDom from './addToCartDom.js';
import { openCart } from './toggleCart.js';

const cartItemCountEl = getElement('.cart-item-count');
const cartItemsEl = getElement('.cart-items');
const cartTotalEl = getElement('.cart-total');

let cart = getStorageItem('cart');

// Cart에 추가하는 함수
export const addToCart = (id) => {
    let item = cart.find((cartItem) => cartItem.id === id);

    // 이미 해당 아이템이 장바구니에 없을 떄
    if (!item) {
        let product = findProduct(id);

        product = { ...product, amount: 1};

        cart = [...cart, product];

        // item을 DOM에 추가하기
        addToCartDom(product);
    } else {
        // 해당 아이템이 있을 떄
        const amount = increaseAmount(id);
        const items = [...cartItemsEl.querySelectorAll('.cart-item-amount')];
        const itemEl = items.find((value) => value.dataset.id === id);
        itemEl.textContent = amount;
    }

    displayCartItemCount();

    displayCartTotal();

    setStorageItem('cart', cart);

    openCart();
}

// addToCart가 아니어도 보이게끔 처리하는 함수
function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
        addToCart(cartItem);
    })
}


// CartItem 개수를 나타내는 함수
function displayCartItemCount() {
    const amount = cart.reduce((acc, curr) => {
        return (acc += curr.amount)
    }, 0);
    cartItemCountEl.textContent = amount;
}

// CartTotal을 나타내는 함수
function displayCartTotal() {
    let total = cart.reduce((acc, curr) => {
        return (acc += curr.price * curr.amount)
    }, 0);

    cartTotalEl.textContent = `Total: ${formatPrice(total)}`;
}

// cart에서 제거하는 함수
function removeItem(id) {
    // id와 같지 않은 것만 제외시킴
    cart = cart.filter((cartItem) => cartItem.id !== id);
}

// Item의 개수 증가하는 함수(해당하는 id에 맞게)
function increaseAmount(id) {
    let newAmount;

    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount + 1;
            cartItem = { ... cartItem, amount: newAmount};
        }
        return cartItem;
    })
    return newAmount;
}

// Item의 개수 감소하는 함수(해당하는 id에 맞게)
function decreaseAmount(id) {
    let newAmount;

    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount - 1;
            cartItem = {...cartItem, amount: newAmount};
        }
        return cartItem;
    })
    return newAmount;
}

function setupCartFunctionality() {
    cartItemsEl.addEventListener('click', (e) => {
        const element = e.target;
        const parent = e.target.parentElement;
        const id = e.target.dataset.id;
        const parentID = e.target.parentElement.dataset.id;

        // remove 클릭시 요소를 없앰
        if (element.classList.contains('cart-item-remove-btn')) {
            removeItem(id);

            element.parentElement.parentElement.remove();
        }

        // increase 클릭시 item 증가
        if (parent.classList.contains('cart-item-increase-btn')) {
            const newAmount = increaseAmount(parentID);
            parent.nextElementSibling.textContent = newAmount;
        }

        // decrease 클릭시 item 감소
        if (parent.classList.contains('cart-item-decrease-btn')) {
            const newAmount = decreaseAmount(parentID);
            if (newAmount === 0) {
                removeItem(parentID);
                parent.parentElement.parentElement.remove();
            } else {
                parent.previousElementSibling.textContent = newAmount;
            }
        }
        displayCartItemCount();
        displayCartTotal();
        setStorageItem('cart', cart);
    })
}

// 장바구니 기능 사용 위해 초기화 하는 함수
const init = () => {
    displayCartItemCount();

    displayCartTotal();

    displayCartItemsDOM();

    setupCartFunctionality();
}

init();