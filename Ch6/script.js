// Constructor 함수 활용
// Book Constructor function
function Book(title, author) {
  this.title = title;
  this.author = author;
}

// UI Constructor function
function UI() {}

const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const bookSubmitEl = document.getElementById("book-form");
bookSubmitEl.addEventListener("submit", (e) => {
  // submit 할 때 새로고침 되서 바뀌는 기본값을 막음
  e.preventDefault();

  const title = titleEl.value;
  const author = authorEl.value;

  const book = new Book(title, author);

  const ui = new UI();

  if (title === "" || author === "") {
    console.log("error");
    ui.showAlert("모든 필드를 채워주세요", "error");
  } else {
    // 책을 리스트에 추가
    ui.addBookToList(book);
    // 성공 메시지를 보여주기
    ui.showAlert("책이 추가되었습니다.", "success");
    // 필드들을 초기화
    ui.clearFields();
  }
});

// prototype에 내부 정보가 있기에 위에서 만든 UI 생성자 함수로 만든 걸 가지고 아래와 같은 함수 추가
// 즉, prototype을 활용해서 확장해서 메소드 추가
// 책 추가하는 함수
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  // 요소 추가를 위한 태그 생성
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

  // book-list table에 row HTML을 추가함
  list.appendChild(row);
};

// 필드 초기화 함수
UI.prototype.clearFields = function () {
  titleEl.value = "";
  authorEl.value = "";
};

// 성공 메시지 보여주는 함수
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");

  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");

  // form 앞에 div 태그 삽입
  container.insertBefore(div, form);

  // 3초 뒤에 안내하고 삭제
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

const bookList = document.getElementById("book-list");
bookList.addEventListener("click", (e) => {
  const ui = new UI();

  ui.deleteBook(e.target);

  ui.showAlert("책이 지워졌습니다.", "success");
});

// 삭제버튼 클릭시 삭제하기 위한 함수 확장
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    // delete a 태그를 누르면 그 a 태그의 조상 태그를 해야지 책이 사라지기 때문에 아래와 같이함
    target.parentElement.parentElement.remove();
  }
};
