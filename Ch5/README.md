## 백그라운드 비디오 앱

### 초기 설계
1. 기본 태그에 백그라운드 이미지를 줄 수 있듯이 비디오를 주거나 width & height를 풀로 주고 별도의 blur처리 스타일링을 추가하는 것
2. 재생 & 정지 버튼의 경우 비디오 태그와 연동하여서 컨트롤 할 수 있게 이벤트 추가

## 실제 개발 후

### HTML 설계
1. 기본 설계는 단순하나 video 태그에서 자동 재생을 위해서 muted 속성과 그 외에 별도로 플레이어가 뜨게 controls, autoplay, loop 속성이 추가된 것 신경써야함

### CSS 설계
1. z-index를 활용해서 백그라운드에 블러처리와 preloader 등 여러가지 태그들의 처리를 함
2. 최상위 태그 기준으로 위치를 조정 및 정렬하기 위해서 absolute position을 적극 활용함

### JS 설계
1. DOMContentLoaded로 이벤트 리스너로 처리한 것이 아닌 load로 함. 왜냐하면 load의 경우 이미지나 비디오 등의 리소스까지 감안해서 기다리지만 DOMContentLoaded의 경우 그냥 DOM이 load할 때 처리하기 때문임
2. 그 외에 slide 효과를 queryselector로 CSS로 불러오고 classList에 추가하면서 슬라이드 효과를 처리함 이와 동시에, 비디오도 시작 및 일시정지를 시킴