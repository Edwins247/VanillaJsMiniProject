const modal = document.getElementsByClassName('modal')[0];
const modalTitleDOM = document.getElementsByClassName('modal-title')[0];
const modalDescriptionDOM = document.getElementsByClassName('modal-description')[0];


export const handleModalOpen = ({
    isSuccess,
    timeString,
}) => {
    modalTitleDOM.classList.add('open')

    if (isSuccess) {
        modalTitleDOM.innerHTML = "성공!";
        modalDescriptionDOM.innerHTML = `${timeString}만에 성공했습니다!`;
    } else {
        modalTitleDOM.innerHTML = "실패!";
        modalDescriptionDOM.innerHTML = '다시 시도해보세요~!';
    }
};

export const handleModalClose = (onModalClose) => {
    modalTitleDOM.classList.remove('open');
    onModalClose?.();
};