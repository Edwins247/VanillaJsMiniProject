## Tabs 기능

### 초기 설계
1. header로 페이지명을 div 태그로 가운데 정렬 처리(display 변경 후)
2. main 섹션에 이미지 태그, 탭 태그 리스트로 두는데 가운데 텍스트는 그대로 두고 탭 기능 시 변하게끔 처리
3. main 섹션 div container로 감싼 뒤, 이미지 태그 & 탭 태그 display flex 혹은 float으로 구분 후 width 속성으로 정렬
4. 탭 태그 안에 설명 텍스트 추가로 감싸서 공간 차지하기
5. 기본 레이아웃 잡은 후 JS를 통해서 탭 태그들 querySelector로 선택
6. 탭 선택시 메인 섹션에 해당하는 텍스트 배경 및 선택시 transition DOM 조작으로 처리, 그리고 해당하는 텍스트 변경하게 처리하기