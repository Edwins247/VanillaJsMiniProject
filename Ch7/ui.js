export class UI {
  // 제품을 추가하는 메소드
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");

    element.innerHTML = `
            <div class="u-full-width">
                <div>
                    <strong>상품 이름</strong>: ${product.name} -
                    <strong>상품 가격</strong>: ${product.price} - 
                    <strong>상품 연도</strong>: ${product.year} - 
                    <a href="#" name="delete">X</a>
                </div>
            </div>
        `;

    productList.appendChild(element);
  }

  // 메시지를 보여주는 메소드
  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert ${cssClass}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.querySelector("#product-form");

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // 필드 초기화 하는 메소드
  resetForm() {
    document.getElementById("product-form").reset();
  }

  // 제품을 삭제하는 메소드
  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      this.showMessage("제품이 성공적으로 삭제되었습니다", "success");
    }
  }
}
