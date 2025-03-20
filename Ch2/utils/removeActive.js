// active를 삭제하는 함수
export default function removeActive(items) {
    items.forEach((btn) => btn.classList.remove('active'));
}