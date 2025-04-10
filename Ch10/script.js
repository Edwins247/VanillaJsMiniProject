const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".form-input");
const resultsEl = document.querySelector(".results");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = inputEl.value;
  // 값이 없다면 early return
  if (!value) {
    resultsEl.innerHTML = '<div class="error"> 검색어를 작성해주세요. </div>';
    return;
  }
  // 값이 있으면 API 요청 후 불러옴
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultsEl.innerHTML = '<div class="loading"></div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();

    // 데이터를 재가공함
    const results = data.query.search;
    // 데이터가 없다면 에러 리턴
    if (results.length < 1) {
      resultsEl.innerHTML =
        '<div class="error"> 검색어에 맞는 결과가 없습니다.</div>';
    }
    renderResults(results);
  } catch (error) {
    resultsEl.innerHTML =
      '<div class="error">요청을 보내는데 에러가 있습니다.<div/>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
            ${snippet}
            </p>
        </a>
        `;
    })
    .join("");

  resultsEl.innerHTML = `<div class="articles">${cardsList}</div>`;
};
