const about = document.querySelector('.about');
const btns = document.querySelectorAll('.tab-btn');
const articles = document.querySelectorAll('.content');

about.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    // 클릭한 data-id를 가져옴
    if (id) {
        // 그 가져온 id에 대해서 버튼을 순회해서 active를 삭제함
        btns.forEach((btn) => {
            btn.classList.remove("active");
        })

        // 그리고 클릭한 값에 대해서 active class를 추가함
        e.target.classList.add("active");

        // 마찬가지로 content 역시 그 값을 찾아서 지우고 active class를 추가해야함
        articles.forEach((article) => {
            article.classList.remove("active");
        })

        const element = document.getElementById(id);
        element.classList.add("active");
    }
})