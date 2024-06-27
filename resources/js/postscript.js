import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import { dbService, updateDocument } from '../../firebase.js';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc as firestoreDoc,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

// Firebase를 구성하는 정보
const firebaseConfig = {
  apiKey: 'AIzaSyAacCYNcsw241GRaLn9A5jUuS0hm0qbxbs',
  authDomain: 'project-52d4c.firebaseapp.com',
  projectId: 'project-52d4c',
  storageBucket: 'project-52d4c.appspot.com',
  messagingSenderId: '587892298418',
  appId: '1:587892298418:web:43d4e281e654f11750efab',
  measurementId: 'G-ZY1J3CGR0E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 로그인이 되어있지 않은 경우, 접근이 제한됩니다.
const userInfo = sessionStorage.getItem('userInfo');
if (!userInfo) {
  alert('로그인을 해주세요.');
  window.location.href = './signIn.html';
}

// 작성한 게시글을 화면에 반영합니다.
async function getBoard() {
  const tableBody = document.querySelector('#tbody');
  console.log(tableBody);
  const querySnapshot = await getDocs(collection(db, 'board'));
  querySnapshot.forEach((doc) => {
    // 게시글의 정보를 저장할 객체를 생성합니다.
    const data = doc.data();
    const { name, title, date } = data;
    const row = document.createElement('tr');
    row.setAttribute('data-id', doc.id);

    // 각 열에 데이터를 삽입합니다.
    row.innerHTML =
      ('afterbegin',
      `
    <td class="name">${name}</td>
    <td class="title">${title}</td>
    <td class="date">${date}</td>
    `);

    tableBody.append(row);
  });
}

// table에 클릭 이벤트를 생성합니다. (클릭을 하면 노란색 배경이 씌워지며 모달 창이 나타납니다.)
let selectedRow;
const tableTag = document.querySelector('table');
tableTag.addEventListener('click', async function (e) {
  if (e.target.tagName != 'TH' && e.target.tagName != 'TABLE') {
    if (selectedRow) {
      selectedRow.classList.remove('selected');
    }
    e.target.parentElement.classList.add('selected');
    selectedRow = e.target.parentElement;

    // 선택된 행의 data-id를 가져옵니다.
    const postDocId = selectedRow.getAttribute('data-id');
    if (!postDocId) {
      console.error('게시글 ID를 찾을 수 없습니다.');
      return false;
    }

    try {
      // Firestore에서 해당 게시글 문서를 가져옵니다.
      const docSnapshot = await getDoc(firestoreDoc(db, 'board', postDocId));
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const { title, content } = data;

        // 모달 창 내용을 업데이트 합니다.
        const modalTitleElement = document.querySelector('.modal-title');
        const modalContentElement = document.querySelector('.modal-content');

        // db에서 가져온 title, content입니다.
        modalTitleElement.textContent = title;
        modalContentElement.textContent = content;

        // 모달 창을 엽니다.
        const modal = document.querySelector('#modal');
        modal.style.display = 'block';
        console.log('현재 작성되어 있는 게시글의 정보: ', selectedRow);
      } else {
        console.error('해당 게시글을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('게시글을 가져오는 동안 오류가 발생했습니다: ', error);
    }
  }
});

// 삭제 버튼을 클릭하면 게시글을 삭제 합니다.
const deleteBtn = document.querySelector('.deleteBtn');
deleteBtn.addEventListener('click', async () => {
  if (confirm('정말로 삭제 하시겠습니까?')) {
    // 현재 sessionStorage에 로그인 되어있는 사용자의 정보를 가져옵니다.
    const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
    const currentUserDocId = currentUser.docId;
    console.log('현재 로그인 되어있는 사용자의 docId: ', currentUserDocId);

    if (selectedRow) {
      // 선택된 행에서 게시글의 docId를 가져옵니다.
      const postDocId = selectedRow.getAttribute('data-id');
      console.log('선택된 게시글의 docId: ', postDocId);

      if (postDocId) {
        try {
          // Firestore에서 해당 게시글 문서를 가져옵니다.
          const docRef = firestoreDoc(db, 'board', postDocId);
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            // 게시글 데이터에서 작성자의 docId를 가져옵니다.
            const postData = docSnapshot.data();
            const postAuthorDocId = postData.userDocId;
            console.log(postData);
            console.log('게시글 작성자의 docId: ', postAuthorDocId);

            // 현재 sessionStorage에 로그인 되어있는 사용자의 docId와 게시글 작성자의 docId를 비교하여 일치하면 삭제합니다.
            if (currentUserDocId === postAuthorDocId) {
              // Firebase에서 데이터를 삭제합니다.
              await deleteDoc(docRef);
              alert('게시글이 성공적으로 삭제되었습니다.');
              console.log('게시글이 성공적으로 삭제되었습니다.');

              // 화면에 삭제한 게시글을 제거합니다.
              const boardRow = document.querySelector(
                `tr[data-id="${postDocId}"]`
              );
              if (boardRow) {
                boardRow.remove();
              }

              // 모달 창을 닫습니다.
              const modal = document.querySelector('#modal');
              modal.style.display = 'none';
            } else {
              alert('삭제 권한이 없습니다.');
              console.log('삭제 권한이 없습니다.');
            }
          } else {
            alert('해당 게시글을 찾을 수 없습니다.');
            console.error('해당 게시글을 찾을 수 없습니다.');
          }
        } catch (error) {
          alert('게시글을 삭제하는 동안 오류가 발생했습니다.: ', error);
          console.error('게시글을 삭제하는 동안 오류가 발생했습니다.: ', error);
        }
      } else {
        alert('게시글 ID를 찾을 수 없습니다.');
        console.error('게시글 ID를 찾을 수 없습니다.');
      }
    } else {
      alert('선택된 게시글이 없습니다.');
      console.error('선택된 게시글이 없습니다.');
    }
  }
});

// 수정 버튼 이벤트 리스너
const modifyBtn = document.querySelector('.modifyBtn');
modifyBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  const createModal = document.getElementById('createModal');
  const modifyModal = document.getElementById('modifyModal');

  // 수정 모달 창을 띄우기 위해 현재 열려 있는 작성 모달 창을 닫습니다.
  createModal.style.display = 'none';

  const selectedPost = selectedRow.getAttribute('data-id');
  if (!selectedPost) {
    console.error('게시글 ID를 찾을 수 없습니다.');
    return false;
  }

  // 현재 sessionStorage에 로그인 되어있는 사용자의 정보를 가져옵니다.
  const currentUser = JSON.parse(sessionStorage.getItem('userInfo'));
  const currentUserDocId = currentUser.docId;

  if (selectedRow) {
    // 선택된 행에서 게시글의 docId를 가져옵니다.
    const postDocId = selectedRow.getAttribute('data-id');
    console.log('선택된 게시글의 docId: ', postDocId);

    if (postDocId) {
      try {
        const docRef = firestoreDoc(db, 'board', postDocId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const postData = docSnapshot.data();
          const postAuthorDocId = postData.userDocId;

          // 현재 사용자의 docId와 게시글 작성자의 docId를 비교하여 권한을 확인합니다.
          if (currentUserDocId !== postAuthorDocId) {
            alert('수정 권한이 없습니다.');
            return false;
          }
        }
      } catch (error) {
        console.error('게시글을 가져오는 동안 오류가 발생했습니다.', error);
      }
    }
  }
  try {
    const docRef = firestoreDoc(db, 'board', selectedPost);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const { title, content } = data;

      // 수정 모달의 입력 필드에 현재 게시글의 제목과 내용을 설정합니다.
      const modifyTitleInput = modifyModal.querySelector('.modifyTitle');
      const modifyContentInput = modifyModal.querySelector('.modifyContent');

      // db에서 가져온 title, content입니다.
      modifyTitleInput.value = title;
      modifyContentInput.value = content;
    } else {
      console.error('해당 게시글을 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('게시글을 가져오는 동안 오류가 발생했습니다.', error);
  }

  // 수정 모달 창을 표시합니다.
  modifyModal.style.display = 'block';
});

// 수정이 완료되면 수정 버튼을 눌러 저장합니다.
const modifySubmitBtn = document.querySelector('.modifySubmitBtn');
modifySubmitBtn.addEventListener('click', async () => {
  const modifyModal = document.querySelector('#modifyModal');

  // 수정된 제목과 내용을 불러옵니다.
  const modifyTitleInput = document.querySelector(
    "textarea[name='modifyTitle']"
  ).value;
  const modifyContentInput = document.querySelector(
    "textarea[name='modifyContent']"
  ).value;
  console.log('제목: ' + modifyTitleInput + '\n내용: ' + modifyContentInput);

  // 현재 선택된 행을 찾습니다.
  const selectedRow = document.querySelector('tr.selected');

  // 선택된 행의 데이터에서 게시글 ID 가져옵니다.
  const postDocId = selectedRow.getAttribute('data-id');

  // Firestore에서 해당 게시글의 문서를 가져옵니다.
  const docRef = firestoreDoc(db, 'board', postDocId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    try {
      // 수정할 데이터입니다.
      const newData = {
        title: modifyTitleInput,
        content: modifyContentInput,
      };
      console.log(newData);

      // Firestore에 문서를 업데이트 합니다.
      await updateDocument('board', postDocId, newData);

      // 화면에 변경사항을 저장합니다.
      const titleElement = selectedRow.querySelector('.title');
      titleElement.textContent = newData.title;

      alert('게시글이 성공적으로 수정되었습니다.');

      // 게시글이 수정되면 수정 모달 창을 닫습니다.
      modifyModal.style.display = 'none';
    } catch (error) {
      console.error('게시글을 수정하는 동안 오류가 발생했습니다: ', error);
      alert('게시글을 수정하는 동안 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  } else {
    alert('해당 게시글을 찾을 수 없습니다.');
  }
});

// 모달창 닫기 버튼을 클릭하면 모달 창을 닫습니다.
const closeBtn = document.querySelector('.closeBtn');
closeBtn.addEventListener('click', () => {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';
});

// 게시글을 작성하는 함수입니다.
const createBtn = document.getElementById('createBtn');
createBtn.addEventListener('click', async (e) => {
  // 이벤트 전파를 방지합니다.
  e.preventDefault();
  e.stopPropagation();

  const createModal = document.getElementById('createModal');
  createModal.style.display = 'block';
});

// 작성 모달 창에서 작성 버튼을 누를 시 Firestore database 및 게시판 화면에 게시글이 저장됩니다.
// userDocId, name, title, content, date가 저장 됩니다.
const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', async () => {
  // 입력한 제목 및 내용의 값을 불러옵니다.
  const createTitle = document.querySelector("textarea[name='createTitle']");
  const createContent = document.querySelector(
    "textarea[name='createContent']"
  );

  // 입력 필드에서 양 끝의 공백을 제거합니다.
  const title = createTitle.value.trim();
  const content = createContent.value.trim();

  // 제목과 내용이 모두 비어있으면 작성을 할 수 없습니다.
  if (title === '' || content === '') {
    alert('제목과 내용은 빈 칸으로 작성하실 수 없습니다.');
    return false;
  }

  // 작성자명을 불러옵니다.
  const userNameString = sessionStorage.getItem('userInfo');
  const userInfo = JSON.parse(userNameString);
  const name = userInfo.name;
  const userDocId = userInfo.docId;

  // 게시물 제목,내용 및 작성시간, 사용자의 정보를 저장하는 객체를 생성합니다.
  const addObj = {
    name,
    title,
    content,
    userDocId,
    // 작성일 기준으로 고정합니다.
    date: new Date().toLocaleDateString('ko-KR'),
  };

  try {
    // Firebase에 데이터를 추가합니다.
    const docRef = await addDoc(collection(db, 'board'), addObj);

    // 추가된 문서의 아이디입니다.
    const docId = docRef.id;

    // 화면에 추가된 데이터를 표시합니다.
    const tableTag = document.querySelector('#table');
    tableTag.lastElementChild.insertAdjacentHTML(
      'afterbegin',
      `
      <tr data-id=${docId}>
      <td class="name">${addObj.name}</td>
      <td class="title">${addObj.title}</td>
      <td class="date">${addObj.date}</td>
      </tr>
      `
    );
  } catch (error) {
    console.error('Error adding document: ', error);
  }

  // 올바른 정보인지 확인하기 위한 console.log입니다.
  console.log(
    `name: ` +
      name +
      `, title: ` +
      title +
      `, content: ` +
      content +
      `, userDocId: ` +
      userDocId
  );

  // 작성이 완료되면 작성 버튼을 눌러 저장합니다.
  const createModal = document.querySelector('#createModal');
  alert('정말 이대로 작성 하시겠습니까?');
  createModal.style.display = 'none';
});

// 작성 모달 창에서 취소 버튼을 누를 시 원래 페이지로 돌아갑니다.
const closeCreateBtn = document.querySelector('.closeCreateBtn');
closeCreateBtn.addEventListener('click', () => {
  const createModal = document.querySelector('#createModal');
  createModal.style.display = 'none';
});

// 수정 모달 창에서 취소 버튼을 누를 시 원래 페이지로 돌아갑니다.
const closeModifyBtn = document.querySelector('.closeModifyBtn');
closeModifyBtn.addEventListener('click', () => {
  const modifyModal = document.querySelector('#modifyModal');
  modifyModal.style.display = 'none';
});

// 페이지를 로드하면 게시글을 불러옵니다.
window.onload = () => {
  getBoard();
};
