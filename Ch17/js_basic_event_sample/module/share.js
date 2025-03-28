
const shareURLButton = document.getElementById('url-share-button');

export const setShareURLButton = () => {
    shareURLButton.onclick = () => {
        // 현재 URL을 클립보드에 복사
        navigator.clipboard.writeText(location.href);
    }
}