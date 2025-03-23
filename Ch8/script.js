// 날씨 데이터를 받기 위해서 기본 api 객체
const api = {
  key: "15dd264653ae19e803a868ed7fb3c895",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBoxEl = document.querySelector(".search-box");
// keypress 키를 눌렀을 때 이벤트 처리
searchBoxEl.addEventListener("keypress", setQuery);

function setQuery(e) {
  // 엔터를 눌렀을 때를 의미함
  if (e.keyCode === 13) {
    getResults(searchBoxEl.value);
  }
}

function getResults(query) {
  // 비동기로 입력받은 값을 바탕으로 데이터를 요청함
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((response) => response.json())
    .then((data) => displayResults(data));
}

// 요청해서 받은 데이터를 보여주기 위한 메소드
function displayResults(weather) {
  // 해당 데이터를 보여줘야 할 태그에 가공해서 넘겨줘서 보여줌
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name} + ${weather.sys.country}`;
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  // 날씨를 보여주기 위한 처리
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}

// 날짜를 보여주기 위해서 재가공 하는 메소드
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
