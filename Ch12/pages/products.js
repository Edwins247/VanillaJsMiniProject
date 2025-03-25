import fetchProducts from '../fetchProducts.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';
import { setupStore, store } from '../store.js';
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

const init = async () => {
    const loadingEl = getElement('.page-loading');

    // 상품들 데이터 가져오고 다시 localStorage에 저장
    const products = await fetchProducts();
    setupStore(products);

    // 상품들을 보여주기
    display(store, getElement('.products-container'));

    // 핕러 기능 추가하기
    setupSearch(store);
    setupCompanies(store);
    setupPrice(store);

    loadingEl.style.display = 'none';
}

init();