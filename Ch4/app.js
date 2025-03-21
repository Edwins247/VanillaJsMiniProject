const productsContainerEl = document.querySelector(".products-container");


// 원본 데이터를 손상가지 않게 하기 위해서 별도의 데이터로 얕은 복사를 진행함
let filteredProducts = [...products];

const formEl = document.querySelector('.input-form');
const searchInputEl = document.querySelector('.search-input');

// 검색값에 맞춰서 필터링을 해주기 위해서 keyup이벤트로 진행
formEl.addEventListener('keyup', () => {
    const inputValue = searchInputEl.value;

    // 입력한 값이 포함한 경우 해당하는 프로덕트를 보여지게 처리함
    filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(inputValue);
    })

    displayProducts();
})

// product를 담을 요소를 불러오고 그에 대한 데이터를 map해서 html을 추가하는 로직
const displayProducts = () => {
  productsContainerEl.innerHTML = filteredProducts
    .map((product) => {
      const { id, title, image, price } = product;
      return `
            <article class="product" data-id="${id}">
            <img
              src="${image}"
              class="product-img img"
              alt="product-img"
            />
            <div>
              <h5 class="product-name">${title}</h5>
              <span class="product-price">${price}</span>
            </div>
          </article>
        `;
    })
    .join("");
};

displayProducts();

const companiesEl = document.querySelector('.companies');

// 버튼을 display하기 위한 함수(중복되지 않게 진행)
const displayButtons = () => {
    // set 자료구조를 활용해서 중복을 제외하고 배열로 만듬, 그리고 product의 company 데이터를 넣음
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  // company 이름을 데이터 값으로, 태그를 만듬
  companiesEl.innerHTML = buttons
  .map((company) => {
    return `
    <button class="company-btn" data-id="${company}">${company}</button>
    `
  })
  .join('');
};

displayButtons();


// 버튼을 눌렀을 때, 클릭 이벤트 발생시, 함수를 통해서 필터링
companiesEl.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('company-btn')) {
        if (el.dataset.id === 'all') {
            filteredProducts = {...products};
        } else {
            // el와 같은 data-id와 company를 필터링을 하게함
            filteredProducts = products.filter((product) => {
                return product.company === el.dataset.id;
            })
        }

        displayProducts();
    }
})