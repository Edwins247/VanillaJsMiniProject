import display from "./src/displayProducts.js";
import fetchProducts from "./src/fetchProducts.js"
import { setupStore } from "./src/store.js";
import { getElement } from "./src/utils.js";

// toggleSidebar 이벤트를 적용하기 위해서 import함
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js'

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