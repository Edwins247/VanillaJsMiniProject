## 필터 기능 앱

### 초기 설계
1. 앞서 만든 음식 메뉴앱과 비슷한 레이아웃 구성(스타일 구성이 다르게 되고)
2. 그리고 필터 기능 및 JSON 조작, 데이터 처리도 마찬가지
3. 다른점은 Input에서 이벤트 리스너를 등록해서 키 값에 따라 필터가 되도록 이에 대한 변수 및 태그에 대한 필터링 함수 연결 필요

## 실제 개발 후

### HTML 설계
1. section을 통해서 product를 만들고 내부의 filter와 products를 구분하기 위한 div 태그로 나눔
2. filters안에는 input form과 회사명에 따른 필터를 위한 회사명이 버튼으로 들어감(article로 구분)
3. products에는 product와 관련사항인 이미지와 이름, 가격등 article로 구분해서 넣음

### CSS 설계
1. HTML 설계대로, 크기를 맞추고 배치를 그에 맞게 조정함
2. 여기서 미디어 쿼리 활용을 통해서 자연스러운 배치가 되도록 기본 레이아웃을 짜고 추가적으로 위치를 조정함
- 놓친 부분 : cursor를 간과하고 있었는데, 이 속성의 경우, 마우스 커서가 올라갔을 때 모양인데 일반적인 마우스 포인터를 가르키기 위해서 처리한 것
- 놓친 부분 : 미디어 쿼리를 활용해서 min-width에 맞게 각각의 요소들을 사전에 먼저 처리하는 것

### JS 설계
1. 마찬가지로 JS만으로 활용한다면 해당하는 데이터를 객체 배열이기에 관련 내장 메소드를 통해서 필요한 데이터를 받고
2. 이를 innerHTML로 보여주면 됨(왜냐하면 어차피 반복되는 것이기에 하드코딩을 지양하기 위해서, 데이터는 언제든 바뀌니까)
3. 여기서 주의할 사항은 원본 데이터를 손상시키지 않기 위해서 별도로 복사한 데이터를 통해서 처리하는 것