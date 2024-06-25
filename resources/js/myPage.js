import { getDatas, updateDatas, deleteDatas } from '../../firebase.js';

const userInfo = sessionStorage.getItem('userInfo');
if (!userInfo) {
  alert('로그인을 해주세요.');
  window.location.href = './signIn.html';
}

// 로그아웃
document.getElementById('logout').addEventListener('click', function () {
  if (confirm('정말 로그아웃 하시겠습니까?')) {
    sessionStorage.removeItem('userInfo');
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  }
});

// 회원정보표시
async function getMembers() {
  try {
    const snapshot = await getDatas('userInfo');

    let userData;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === JSON.parse(userInfo).id) {
        userData = data;
      }
    });

    if (userData) {
      const { id, name, phone } = userData;
      const profileInfo = document.querySelector('.profile-info');
      profileInfo.innerHTML = `
        <table class="table">
          <tr>
            <th scope="row">아이디</th>
            <td>${id}</td>
          </tr>
          <tr>
            <th scope="row">이름</th>
            <td>${name}</td>
          </tr>
          <tr>
            <th scope="row">전화번호</th>
            <td>${phone}</td>
          </tr>
        </table>
      `;
    }
  } catch (err) {
    console.log(err);
  }
}

// section 이동 핸들러
const settingBtns = document.querySelectorAll('.setting-btn');
const sections = document.querySelectorAll('section');

settingBtns.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSection = this.getAttribute('data-section');

    sections.forEach((section) => {
      section.classList.remove('active');
      if (section.id === targetSection) {
        section.classList.add('active');
      }
    });
  });
});

// document
//   .querySelector('input[type="checkbox"]')
//   .addEventListener('change', function (e) {
//     console.log(e.target.checked);
//   });

// 회원탈퇴하기 버튼 핸들러
const withdrawalBtn = document.getElementById('withdrawal-btn');
withdrawalBtn.addEventListener('click', async function () {
  // 삭제를 하기 전 확인 메세지를 표시합니다.
  if (confirm('정말 회원 탈퇴 하시겠습니까?')) {
    try {
      // 세션 스토리지에서 사용자 정보를 가져옵니다.
      const userInfoString = sessionStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      if (userInfoString) {
        await deleteDatas('userInfo', userInfo.docId);

        sessionStorage.removeItem('userInfo');

        alert('회원 탈퇴가 성공적으로 완료 되었습니다.');

        window.location.href = '../index.html';
      } else {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('회원 탈퇴 중 오류가 발생했습니다. 다시 시도해 주십시오.');
    }
  }
});

getMembers();
