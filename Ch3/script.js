const menu = [
  {
    id: 1,
    title: "Classic Cheeseburger",
    category: "lunch",
    price: 8.99,
    img: "./images/item-1.jpeg",
    desc: "Juicy beef patty topped with melted cheese, lettuce, tomato, and our signature sauce.",
  },
  {
    id: 2,
    title: "Margherita Pizza",
    category: "dinner",
    price: 12.99,
    img: "./images/item-2.jpeg",
    desc: "Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce.",
  },
  {
    id: 3,
    title: "Pancake Stack",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: "Fluffy pancakes served with maple syrup and a side of fresh berries.",
  },
  {
    id: 4,
    title: "Caesar Salad",
    category: "lunch",
    price: 9.49,
    img: "./images/item-4.jpeg",
    desc: "Crisp romaine lettuce tossed with creamy Caesar dressing, croutons, and parmesan cheese.",
  },
  {
    id: 5,
    title: "Grilled Salmon",
    category: "dinner",
    price: 15.99,
    img: "./images/item-5.jpeg",
    desc: "Perfectly grilled salmon fillet served with steamed vegetables and rice.",
  },
  {
    id: 6,
    title: "French Toast",
    category: "breakfast",
    price: 7.49,
    img: "./images/item-6.jpeg",
    desc: "Golden-brown French toast topped with powdered sugar and served with fresh fruit.",
  },
  {
    id: 7,
    title: "Spaghetti Carbonara",
    category: "dinner",
    price: 13.99,
    img: "./images/item-7.jpeg",
    desc: "Classic Italian pasta dish with creamy sauce, pancetta, and parmesan cheese.",
  },
  {
    id: 8,
    title: "Chicken Wrap",
    category: "lunch",
    price: 8.49,
    img: "./images/item-8.jpeg",
    desc: "Grilled chicken wrapped in a soft tortilla with lettuce, tomato, and ranch dressing.",
  },
  {
    id: 9,
    title: "Avocado Toast",
    category: "shakes",
    price: 5.99,
    img: "./images/item-9.jpeg",
    desc: "Toasted bread topped with smashed avocado, cherry tomatoes, and a sprinkle of chili flakes.",
  },
  {
    id: 10,
    title: "Steak Dinner Plate",
    category: "dinner",
    price: 19.99,
    img: "./images/item-10.jpeg",
    desc: "Succulent steak cooked to perfection served with mashed potatoes and sautéed vegetables.",
  },
];

window.addEventListener('DOMContentLoaded', () => {
  displayMenuButtons();
  displayMenuItems(menu);
})


const sectionCenterEl = document.querySelector('.section-center');
const btnContainerEl = document.querySelector('.btn-container');

// 동적으로 데이터에 따라서 버튼을 만드는 함수
function displayMenuButtons() {
  // reduce 메소드를 통해서, 데이터를 순회해서, category를 더해서 누적함
  // acc로 누적하고 curr로 순횐하는 데이터 값을 처리할 수 있음
  const categories = menu.reduce((acc, curr) => {
    // 누적값에 없는 경우에만 추가
    if (!acc.includes(curr.category)) {
      acc.push(curr.category);
    }
    return acc;
  },['all'])

  // 값을 순회하고 해당 html 태그를 직접 그 카테고리에 맞게 값을 만듬
  const categoryBtns = categories
  .map((category) => {
    return `<button type="button" class="filter-btn" data-id="${category}">
          ${category}
        </button>`
  })
  .join("");

  // innerHTML로 btn-container div 태그에 추가해서 처리함
  btnContainerEl.innerHTML = categoryBtns;

  // 버튼에 대한 각각 이벤트 리스너를 처리
  const filtersBtns = btnContainerEl.querySelectorAll('.filter-btn');
  filtersBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.id;

      // 필터할 데이터 가공(category가 맞는 데이터만 가공해서 보여줌)
      const menuCategory = menu.filter((menuItems) => {
        if (menuItems.category === category) {
          return menuItems;
        }
      })
      // 카테고리에 따라 그 카테고리에 맞는 요소를 보여줘야함
      if (category === 'all') {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    })
  })
}


// 카테고리 요소에 맞게 데이터를 보여주는 함수
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map((item) => {
    return `<article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo"/>
          <div class="item-info">
            <div class="header">
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </div>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`
  })
  displayMenu = displayMenu.join("");
  sectionCenterEl.innerHTML = displayMenu;
}