// anchor-to-select
// anchor-to-result
// anchor-to-mbti

// participate-section
// result-section
// mbti-section

const selectAnchorMenuDOM = document.getElementById('anchor-to-select');
const resultAnchorMenuDOM = document.getElementById('anchor-to-result');
const mbtiAnchorMenuDOM = document.getElementById('anchor-to-mbti');

const selectSectionDOM = document.getElementById('participate-section');
const resultSectionDOM = document.getElementById('result-section');
const mbtiSectionDOM = document.getElementById('mbti-section');

const setScrollHandler = (anchorDOM, targetDOM) => {
    anchorDOM.onclick = () => {
        const scrollTargetY = targetDOM.offsetTop;
        // scroll 메소드를 활용해서 부드럽게 넘김(위치 처리가 쉬우므로 아래 메소드를 씀)
        window.scroll({
            top: scrollTargetY,
            left: 0,
            behavior: 'smooth',
        });
    }
}

export const setTabMenu = () => {
    // selectAnchorMenuDOM 클릭 -> selectSectionDOM으로 스크롤 이동
    // 1) 직접 구현
        // 1. selectSectionDOM의 element 위치를 받아옴
        // 2. window.scrollTo를 이용해서 해당 위치로 이동
        // window.scroll로도 가능
    // 2) scrollIntoView 메서드 활용(DOM에 존재해서 쉽게 구현)
        // selectSectionDOM.scrollIntoView({behavior: 'smooth'})        

    setScrollHandler(selectAnchorMenuDOM, selectSectionDOM);
    setScrollHandler(resultAnchorMenuDOM, resultSectionDOM);
    setScrollHandler(mbtiAnchorMenuDOM, mbtiSectionDOM);

}