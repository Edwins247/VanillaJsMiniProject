import { CART_COOKIE_KEY } from "../constants/cart.js";
import { makeDOMwithProperties } from "../utils/dom.js";


export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];

// 현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과를 반환
const isInCart = ({ id }) => {
    const originalCartInfo = getCartInfo();

    // cartInfo가 있다면 true가 반환, 없으면 false로 리턴함, 부정연산자를 활용했기 떄문
    return !!originalCartInfo.find((cartInfo) => cartInfo.id === id);
    
    
}

const addCartInfo = (productInfo) => {
  // 장바구니에 해당 물품의 정보를 저장
  // null undefined || [] => 혹시 모를 값을 위해서 or 연산 사용
  const originalCartInfo = getCartInfo();

  // 같은 물품이 있다면 early-return
  if (
    originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !==
    -1
  )
    return;

  localStorage.setItem(
    CART_COOKIE_KEY,
    JSON.stringify([...originalCartInfo, JSON.stringify(productInfo)])
  );
};

    // 장바구니에서 해당 물품의 정보를 삭제
const removeCartInfo = ({ id }) => {
    const originalCartInfo = getCartInfo();
    
    // Array.filter 사용, 지우려는 cart만 false로 리턴함
    const newCartInfo = originalCartInfo.filter((cartInfo) => cartInfo.id !== id);
    localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo));
}

export const getCartToggleButton = (productInfo, removeCartCallback) => {
    let inCart = isInCart(productInfo);
  const cartToggleBtn = makeDOMwithProperties("button", {
    className: "cart-toggle-btn",
    type: "button",
    onclick: () => {
        // 그에 맞게 이미지도 변환시키기
        if (inCart) {
            // 조건에 맞을 때 로직을 실행하는 것을 반대로 해서 early-return을 함
            if (!confirm(`[${productInfo.name}]을 장바구니에 삭제할까요?`)) return;
            // 이미 장바구니에 있다면
            removeCartInfo(productInfo);
            cartImage.src = 'public/assets/cart.png';
            removeCartCallback?.();
        } else {
            addCartInfo(productInfo); // 장바구니 넣기
            cartImage.src = 'public/assets/cartDisabled.png';
            // confirm 메소드를 통해 확인을 받고 페이지 이동함
            if (confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요?")) {
                location.href = '/js_basic_market/cart.html';
            }
        }
        inCart = !inCart;
    },
  });
  // 카트에 있다면 들어가는 것을 나타냄
  const cartImage = makeDOMwithProperties("img", {
    className: "cart-image",
    src: inCart ? "public/assets/cartDisabled" : "public/assets/cart.png",
  });
  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
};
