import { getStorageItem, setStorageItem } from "./utils.js"

let store = getStorageItem('store');
// localStorage에 저장하는 메소드('store' 키값으로 저장)
const setupStore = (products) => {
    setStorageItem('store', products);
}

const findProduct = (id) => {
    const product = store.find((product) => product.id === id);
    return product;
}

export {
    store,
    findProduct,
    setupStore
}