// 모듈화를 통해서 클래스로 각각 객체를 만들어서 처리함
// 앞서 생성자 함수와 다르게 클래스를 활용하고 모듈화 전략으로
import { UI } from "./ui.js";
import { Product } from "./product.js";

const formEl = document.getElementById("product-form");
const nameInputEl = document.getElementById("name");
const priceInputEl = document.getElementById("price");
const yearInputEl = document.getElementById("year");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  // input 값을 가져오고 그 값을 바탕으로 Product 인스턴스를 만듬
  const name = nameInputEl.value;
  const price = priceInputEl.value;
  const year = yearInputEl.value;

  const product = new Product(name, price, year);

  const ui = new UI();

  if (name === "" || price === "" || year === "") {
    return ui.showMessage("모든 필드에 데이터를 삽입하십시요", "error");
  }

  // 추가
  ui.addProduct(product);

  // 성공 메시지
  ui.showMessage("제품이 성공적으로 추가되었습니다.", "success");

  // field 초기화
  ui.resetForm();
});

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();

  ui.deleteProduct(e.target);
});
