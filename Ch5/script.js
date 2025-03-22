const btnEl = document.querySelector(".switch-btn");
const videoEl = document.querySelector(".video-container");

btnEl.addEventListener("click", () => {
  // slide가 없는 경우 slide 효과를 위해서 클래스 추가
  if (!btnEl.classList.contains("slide")) {
    btnEl.classList.add("slide");
    // 비디오를 멈춤
    videoEl.pause();
  } else {
    // slide가 있을 땐 없애고, 비디오 시작
    btnEl.classList.remove("slide");
    videoEl.play();
  }
});

const preloaderEl = document.querySelector(".preloader");

// 모든 리소스가 load 될 때 이벤트 리스너 시작
// DOMContentLoaded의 경우, DOM만 로드가 되면 이벤트 리스너 시작 즉, 내부 요소나 리소스를 신경쓰지 않음
// DOM 로드시 preloader 안 보이는 CSS 추가
window.addEventListener("load", () => {
  preloaderEl.classList.add("hide-preloader");
});
