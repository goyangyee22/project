# BILLISHU

## 💻 프로젝트 소개

### BILLISHU

> 빌리슈, 읽어보면 충청도인에게는 참 친숙한 사투리입니다.<br>
> 타지인들이 읽어보면 '외국어인가?'하는 생각이 들고요.<br>
> '빌리슈'는 파티룸, 미팅룸, 펫룸을 편리하게 대여 할 수 있도록 만든 공간대여 서비스입니다.<br>

### 높은 퀄리티와 촘촘한 구조 및 기능

> 회사의 수익 창출에 실질적인 도움이 될 주제로 선택하자는 의견에 기반을 두고 주제를 정했습니다.<br>
> 실무에 들어가면 많은 차이가 있겠지만, 미리 경험해보자는 취지로 팀원들과 협력해 실무 역량을 강화했습니다.

### 최상의 경험을 제공하는 반응형 디자인

> 현재 인터넷 사용자들은 다양한 종류의 기기를 통해 웹 사이트에 접속합니다.<br>
> 이러한 다양한 환경에서도 일관되고 최적화된 사용자 경험을 제공하기 위해 어떤 기기를 사용해도 동일한 콘텐츠와 기능을 효율적으로 제공합니다.

### 일관성을 유지하는 UI/UX 디자인

> 일관된 디자인을 유지하면서도 개성을 부여하기 위해 각 상세페이지에 메인컬러를 변경하는 전략을 사용했습니다. <br>
> 이를 통해 페이지마다 활력을 불어넣으면서도 전체적인 디자인의 일관성을 유지해 사용자에게 시각적인 다양성과 흥미를 할 수 있게 디자인했습니다.

### 명확한 역할 분담과 책임감 강화

> 각 팀원의 역할과 책임을 명확히 정의하여 프로젝트의 모든 측면이 효율적으로 관리될 수 있도록 했습니다. <br>
> 이러한 효과적인 커뮤니케이션과 협력을 바탕으로 높은 성과를 달성할 수 있었습니다.

<br>

## 📅 개발 기간

### 2024.06.12 - 2024.06.28

<br>

## 💪🏻 사용 스킬

- **HTML** - 구조적 마크업
- **CSS** - 스타일링
- **JavaScript** - 동적 기능
- **Firebase** - 백엔드 및 데이터베이스
- **Font Awesome** - 아이콘 라이브러리
- **Swiper** - 이미지 슬라이더 라이브러리
- **Bootstrap** - CSS 프레임워크
- **GSAP (GreenSock Animation Platform)** - 애니메이션 라이브러리
- **FullCalendar API** - 캘린더 기능
- **Google Calendar API** - 구글 캘린더 연동
- **Kakao Map API** - 카카오맵 연동

## 🏴 팀 소개

> ### 1조 + 언빌리버블!!
>
> '하나'의 팀으로서 '한' 마음으로 똑같은 목표를 향해 <br>
> '언빌리버블'한 힘을 모아 포기하지않고 끝까지 최선을 다하고자 <br>
>
> **'원빌리버블'** 이란 이름을 지었습니다.
> <br><br>

**팀장** - 이재협

- 데이터베이스 총괄 제작
- 멤버관련 페이지 제작

<br>

**팀원** - 문희연

- 메인페이지 제작
- 각 섹션 서포트

<br>

**팀원** - 배수연

- 세미나룸 상세페이지 제작 및 디자인

<br>

**팀원** - 서정은

- 펫룸 상세페이지 제작 및 디자인

<br>

**팀원** - 차준호

- 파티룸 상세페이지 제작 및 디자인

<br>

## 🎓 주요 기능

> **로그인 & 회원가입 & 마이페이지 구현**

- CRUD
  - 회원가입을 통해 파이어베이스에 사용자 정보를 저장합니다. (Create)
  - 로그인을 통해 파이어베이스에 저장된 사용자 정보를 불러와<br>
    마이페이지에 출력합니다. (Read)
  - 마이페이지에서 사용자 정보(비밀번호, 전화번호)를 수정할 수 있습니다. (Update)
  - 마이페이지에서 회원탈퇴를 선택 시, 파이어베이스에 저장된 <br>
    사용자 정보를 삭제합니다. (Delete)

<br>

- 로그인
  - 로그인 시 저장된 사용자 정보와 입력받은 값을 비교하여 처리했습니다.

<br>

- 회원가입
  - 정규식을 사용해 아이디와 비밀번호, 전화번호의 양식을 설정했습니다.

<br>

- 마이페이지
  - 파이어베이스에 저장된 사용자 정보와 결제 정보를 불러와 화면에 출력합니다.
  - 로그인하지 않은 사용자는 접근이 제한됩니다.

<br>

> **결제페이지 구현**

- 예약한 내용과 결제한 내용을 파이어베이스에 저장하고,<br>
  마이페이지의 결제내역에서 예약정보와 결제정보의 확인이 가능합니다.
- 로그인하지 않은 사용자는 접근이 제한됩니다.

<br>

> **후기게시판 구현**

- CRUD
  - 게시글을 작성하면 파이어베이스에 작성자, 제목, 내용, 작성일이 저장됩니다. (Create)
  - 파이어베이스에 저장된 모든 게시글을 불러와 화면에 출력합니다. (Read)
  - 작성한 게시글을 클릭하면 수정과 삭제가 가능한 모달을 띄웁니다. (Update, Delete)

<br>

- 접근 제한
  - 로그인하지 않은 사람은 게시글을 작성할 수 없습니다.
  - 자신이 게시한 글만 수정과 삭제가 됩니다.
  - 타인이 게시한 글은 수정과 삭제가 되지 않습니다.

<br>

> **딱딱할 수 있는 레이아웃에 개성을 부여**

- 부트스트랩을 활용하여 예약버튼, 사진보기버튼, 후기작성버튼 클릭 시 <br>
  모달창을 띄워 안에 있는 내용을 볼 수 있도록 적용했습니다.
- 각각의 상세페이지마다 색 구성 비율을 맞추기 위해 60-30-10 법칙을 적용했습니다.

## 💬 개발 코멘트

> **팀장 이재협**

Firebase를 사용하여 회원가입, 로그인, 게시글 작성 등 회원 정보를 저장해야 하는 기능들을 구현하였습니다.

회원가입 버튼을 눌러 정보를 입력하는데 아이디와 핸드폰 번호는 중복 방지 및 정규식을 설정해두어 주어진 양식에서 벗어나지 않고 중복되지 않는 값만을 입력할 수 있게 해 두었습니다.

REVIEW 버튼을 누르면 로그인이 되어있는(session storage) 사용자에 한해서 후기를 작성할 수 있는데 작성하기 버튼을 누르면 후기를 쓸 수 있고 그 또한 작성 버튼을 누르면 화면에 나타나고 Firebase에 저장이 됩니다.

처음 프로젝트를 진행하면서 정말 생각을 해야할 게 많았고 가상의 고객이 있다고 가정하고 그러한 고객을 대상으로 하여 편리하게 기능을 이용할 수 있도록 그 고객의 입장이 되어 어떤 방식으로 페이지를 만들까라는 생각도 했습니다.

주어진 2주 남짓한 기간에 팀 프로젝트를 진행하면서 잘 만들어진 다른 웹 사이트들과 비교하여 제 자신의 역량이 많이 부족했다고 생각했고 처음 해 보는 팀 프로젝트라 많이 어려운 점도 있었지만 어려운 점이 있으면 서로 도움 받으면서 실력을 함께 쌓아갈 수 있는 좋은 기회가 되었다고 생각하며, 웹 사이트의 더 좋고 많은 기능들을 구현할 수 있도록 계속 발전해 갈 예정입니다.

<br>

> **팀원 문희연**

하나의 웹 페이지를 만드는 데 생각보다 로직도 복잡하고 다양한 제어가 필요하다는 것을 깨달았습니다.

사용자 인터페이스와 상호작용하는 다양한 기능을 구현하면서 효율적으로 처리하는 방법을 배웠습니다. 특히 상태 관리와 비동기 작업의 중요성을 알게 되었습니다.

짧은 시간 안에 모든 기능을 구현하는 것은 큰 도전이었지만, 팀원들이 각자의 역할을 충실히 수행하여 협력한 덕분에 성공적으로 프로젝트를 완성할 수 있었습니다.

이 프로젝트를 통해 많은 것을 배우고 성장할 수 있었으며, 팀원들과 함께한 시간이 매우 값진 경험이 되었습니다. 앞으로도 이러한 경험을 바탕으로 더 나은 개발자가 되기 위해 지속적으로 노력할 것입니다.

<br>

> **팀원 배수연**

팀이 나눠지기 전에 너무 막막해서 이런 실력으로 팀원들에게 누만 끼칠 것 같은 생각에 두려웠지만 완성이 되든 못되든 끝까지 완주 할 수 있는 용기를 준 1팀 팀원 들에게 먼저는 감사하고, 아직 자바 스트립트는 많이 도전을 못해 봤지만 상세 페이지를 조금 더 다듬어 보면서 하나씩 해나가야 겠다고 생각이 들었습니다. (파이어 베이스도 마찬가지...)
수업 들을 때랑은 또 다르게 생각해 본 부분을 구현해 볼 수 있는 시간이여서 재미있었고, 스스로 무엇이 부족한지 재미있는지 잘 할 수 있는 부분인지를 발견할 수 있는 시간되어서 여러모로 좋은 경험이 되었어요. 이 부분을 토대로 최종 프로젝트에는 더 발전이 되어있으면 하는 바램입니다.
다음 프로젝트에는 다른 페이지도 도전해 볼 수 있는 실력이 되어 있기를.... ^^;!!

<br>

> **팀원 서정은**

CSS에서의 position 속성은 웹 페이지의 요소를 원하는 위치에 배치하는 데 중요한 역할을 합니다. 처음에는 이 속성을 잘 몰랐지만, 프로젝트를 진행하면서 점차 이해하게 되었습니다.
이러한 속성들을 제대로 이해하고 활용하면서 보다 복잡하고 세련된 레이아웃을 구현할 수 있게 되었습니다.

아쉬운 점은 JavaScript를 이용한 비동기 프로그래밍, DOM 조작, 이벤트 핸들링 등의 개념은 아직도 혼란스럽습니다. 조금 더 공부를 해야겠다고 느꼈습니다.

또한, 이벤트 핸들링을 통해 사용자의 행동에 따라 웹 페이지가 반응하도록 만드는 작업은 웹 개발의 매력을 느끼게 해주었습니다. 사용자와 상호작용할 수 있는 기능을 구현할 때마다 성취감을 느낄 수 있었습니다.

그리고 문제가 발생할 때마다 다양한 자료를 참고하고, 디버깅을 통해 문제를 해결하는 능력을 키웠습니다.
이로써 저는 더 성장하는 개발자가 될 것입니다.

<br>

> **팀원 차준호**

팀 프로젝트를 진행하며 중요성을 몸소 느끼게 되었습니다.
특히, 팀원들과 함께 어려움을 겪었던 부분을 공유하고 해결해 나가는 과정에서 많은 성장을 이루었습니다.
반응형 디자인을 구현하면서 저의 부족한 점을 많이 깨달았고,
특히 CSS에 대해 더 깊이 이해하고 싶다는 욕구가 생겼습니다. JavaScript도 처음에는 어려움을 겪었지만, 프로젝트를 통해 점차적으로 기술적인 실력을 향상시킬 수 있었습니다.

이러한 경험들은 저에게 지속적으로 도전하고 성장할 수 있는 기회를 제공해 주는 것 같습니다. 특히 팀워크와 기술적인 역량을 함께 발전시킬 수 있는 프로젝트 경험은 제 전문성을 향상시키는 데 큰 도움이 되었습니다. 앞으로도 이러한 경험들을 바탕으로 더욱 높은 목표를 향해 나아가고 싶습니다.
