import { productsUrl } from "./utils.js"

// mock-api에 API요청후 결과값을 받아옴
const fetchProducts = async() => {
    const response = await fetch(productsUrl)
    .catch(err => console.log(err));

    if (response) {
        return response.json();
    }

    return response;
}

export default fetchProducts;