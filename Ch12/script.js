import display from "./displayProducts.js";
import fetchProducts from "./fetchProducts.js"
import { setupStore } from "./store.js";
import { getElement } from "./utils.js";

// toggleSidebar 이벤트를 적용하기 위해서 import함
import './toggleSidebar.js';
import './cart/toggleCart.js'

const init = async () => {

    // API에서 products를 불러옴
    const products = await fetchProducts();

    // localStorage에 저장
    if (products) {
        setupStore(products);
    }

    // featured true인 것만 홈화면에 보여주기 위해서 필터링으로 걸러냄
    const featured = products.filter((product) => product.featured === true);
    display(featured, getElement('.featured-center'));
}

window.addEventListener('DOMContentLoaded', init);