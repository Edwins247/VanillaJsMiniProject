// dom : innerHTML이 갱신될 노드
// target : 목표 숫자
// second : 몇 초가 걸릴 지
// term : 몇 초마다 함수 실행할 지

// countTerm : 한 term에 몇이 증가해야 하는지 -> second, term으로 계산해서 처리

export const countUp = (dom, target, second, term = 15) => {
    // dom.innerHTML을 갱신
    // innerHTML이 n초를 간격으로 갱신
    // value += 10
    if (!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;
    const countTerm = Math.floor((target/second) * (term / 1000));
    let nowNumber = 0;

    // target / second => 1초에 몇 씩 증가할 지, term초 -> (target/second) * (term/1000)

    // 타이머가 돌아감 -> 자원을 쓰고 있는 것
    const timerID = setInterval(() => {
        if (nowNumber > target) {
            nowNumber = target;
            clearInterval(timerID);
            return;
        }
        nowNumber += countTerm;
        dom.innerHTML = `${nowNumber.toLocaleString()}`;
    }, term); // 1초 마다 해당 함수 실행(setTimeout은 1초후에 실행하는 것)
}