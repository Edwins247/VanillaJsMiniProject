// 랜덤 유저 데이터를 받는 API를 통해서 유저를 불러오는 함수

// API 받을 주소
const URL = 'https://randomuser.me/api/';

// 비동기 요청으로 함
const getUser = async () => {

    // 브라우저에서 제공하는 윈도우 객체의 Fetch 메소드를 통해 비동기 처리
    const response = await fetch(URL);

    // 받은 데이터를 JSON으로 가공해서 처리
    const data = await response.json();

    // 필요한 데이터를 가공해서 처리함(구조분해할당 처리)
    const person = data.results[0];
    const { phone, email } = person;
    // 이름 변경
    const { large: image } = person.picture;
    // 그 외 정보 가져옴
    const { password } = person.login;
    const { first, last } = person.name;
    const {
        dob: { age }
    } = person;
    const {
        street: { number, name }
    } = person.location;

    // 그리고 받아온 값에 대해서 객체로 리턴함
    return {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`
    }

}

export default getUser;