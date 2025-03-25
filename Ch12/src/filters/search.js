import display from "../../displayProducts.js";
import { getElement } from "../../utils.js"

const setupSearch = (store) => {
    const form = getElement('.input-form');
    const nameInput = getElement('.search-input');
    // 입력한 값에 이름과 같은 product를 리턴하여 보여줌
    form.addEventListener('keyup', () => {
        const value = nameInput.value;
        if (value) {
            const newStore = store.filter((product) => {
                let { name } = product;
                name = name.toLowerCase();
                if (name.startsWith(value)) {
                    return product;
                }
            });

            display(newStore, getElement('.products-container'), true);
        
            // 만약 보여줄 아이템이 없다면
            if (newStore.length < 1) {
                const products = getElement('.products-container');
                products.innerHTML = `
                    <h3 class="filter-error">
                    찾고자 하는 상품이 없습니다.
                    </h3>
                `
            }
        } else {
            // 검색어로 필터할게 없다면 모든 상품을 보여주면 됨
            display(store, getElement('.products-container'), true);
        }
    })
}

export default setupSearch;