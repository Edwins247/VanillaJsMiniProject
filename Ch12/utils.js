// API baseURL
const productsUrl =
'https://67e11a3b58cc6bf7852452a9.mockapi.io/products';

// 가격 형식을 만드는 유틸 함수
const formatPrice = (price) => {
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format((price / 100).toFixed(2));
    return formattedPrice;
}

// 요소를 리턴하는 함수
const getElement = (selection) => {
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error('해당 요소가 존재하지 않습니다.');
}

// localStorage에 저장
const setStorageItem = (name, item) => {
    localStorage.set(name, JSON.stringify(item));
}

export {
    getElement,
    productsUrl,
    formatPrice,
    setStorageItem
}