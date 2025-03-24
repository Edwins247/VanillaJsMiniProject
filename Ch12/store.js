import { setStorageItem } from "./utils.js"

// localStorage에 저장하는 메소드('store' 키값으로 저장)
const setupStore = (products) => {
    setStorageItem('store', products);
}

export {
    setupStore
}