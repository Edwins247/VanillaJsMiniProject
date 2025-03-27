import { getProductSection } from "./module/productSection.js";

const productSection = getProductSection('인기 상품', [
    {
        "id": 1,
        "imgSrc": "/js_basic_market/public/assets/파프리카.jpg",
        "name": "파프리카 2입",
        "discountPercent": 20,
        "price": 2000,
        "originalPrice": 2500
    },
    {
        "id": 2,
        "imgSrc": "/js_basic_market/public/assets/파스타.jpg",
        "name": "파스타",
        "discountPercent": 10,
        "price": 1800,
        "originalPrice": 2000
    },
    {
        "id": 3,
        "imgSrc": "/js_basic_market/public/assets/키위.jpg",
        "name": "키위",
        "discountPercent": 10,
        "price": 2700,
        "originalPrice": 3000
    }
]);

document.body.appendChild(productSection);