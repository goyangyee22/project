// SDK에서 필요한 기능을 가져옵니다.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js';

// Firebase 프로젝트 구성으로 설정합니다.
const firebaseConfig = {
  apiKey: 'AIzaSyAacCYNcsw241GRaLn9A5jUuS0hm0qbxbs',
  authDomain: 'project-52d4c.firebaseapp.com',
  projectId: 'project-52d4c',
  storageBucket: 'project-52d4c.appspot.com',
  messagingSenderId: '587892298418',
  appId: '1:587892298418:web:43d4e281e654f11750efab',
  measurementId: 'G-ZY1J3CGR0E',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase SDK로부터 Firestore 및 Storage 서비스 가져오기
const dbService = getFirestore(app);
const storageService = getStorage(app);

// export const app = initializeApp(firebaseConfig);
// const app = firebase.initializeApp(firebaseConfig);
// const dbService = firebase.firestore(app);

// users 컬렉션에 대한 참조 작성
const usersRef = collection(dbService, 'userInfo');

// 컬렉션에 대한 쿼리를 만듭니다.
const q = query(usersRef, where('id', '==', true));

async function addDatas(collectionName, dataObj) {
  // 문서 ID가 자동으로 할당됩니다.
  try {
    const collect = collection(dbService, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function getDatas(collectionName) {
  try {
    const collect = collection(dbService, collectionName);
    const snapshot = await getDocs(collect);
    return snapshot;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = await firestoreDoc(dbService, collectionName, docId);
    await updateDoc(docRef, updateObj);
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
}

async function updateDocument(collectionName, docId, updateObj) {
  try {
    const docRef = await doc(dbService, collectionName, docId);
    await updateDoc(docRef, updateObj);
    console.log('Document successfully updated!');
    return true;
  } catch (error) {
    console.error('Error updating document: ', error);
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = await doc(dbService, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document: ', error);
    return false;
  }
}

async function deleteDocument(collectionName, docId) {
  try {
    // 해당 문서를 가져옵니다.
    const boardDoc = await getDocs(doc(dbService, collectionName, docId));

    if (!boardDoc.exists()) {
      throw new Error('삭제할 게시글이 존재하지 않습니다.');
    }

    // 게시글의 작성자 정보 가져오기
    const writerDocId = boardDoc.data().docId;

    // 현재 사용자 정보 가져오기
    const currentUserInfoString = sessionStorage.getItem('userInfo');
    const currentUserInfo = JSON.parse(currentUserInfoString);
    const currentDocId = currentUserInfo.docId;

    // 작성자의 아이디와 현재 사용자의 ID가 일치하면 삭제합니다.
    if (writerDocId === currentDocId) {
      await deleteDoc(doc(dbService, collectionName, docId));
      return true;
    } else {
      throw new Error('본인이 작성한 글만 삭제할 수 있습니다.');
    }
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
}

// 페이지네이션
// async function getPaginatedData(
//   collectionName,
//   orderByField,
//   userId,
//   lastVisibleDocument = null
// ) {
//   let q = query(
//     collection(dbService, collectionName),
//     where(userId, '==', 'userInfo.id'),
//     orderBy(orderByField, 'desc'),
//     limit(1)
//   );

//   if (lastVisibleDocument) {
//     q = query(q, startAfter(lastVisibleDocument));
//   }

//   const snapshot = await getDocs(q);
//   const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//   const lastVisible = snapshot.docs[snapshot.docs.length - 1];

//   return { data, lastVisible };
// }

// let lastVisibleDocument = null;

// async function firstPage(collectionName, orderByField, userId, renderFunction) {
//   try {
//     const { data, lastVisible } = await getPaginatedData(
//       collectionName,
//       userId,
//       orderByField
//     );
//     lastVisibleDocument = lastVisible;
//     renderFunction(data);
//   } catch (error) {
//     console.error('Error fetching first page:', error);
//     throw error;
//   }
// }

// async function nextPage(collectionName, orderByField, userId, renderFunction) {
//   if (!lastVisibleDocument) return;
//   const { data, lastVisible } = await getPaginatedData(
//     collectionName,
//     orderByField,
//     userId,
//     lastVisibleDocument
//   );
//   lastVisibleDocument = lastVisible;
//   renderFunction(data);
// }

export {
  app,
  // db,
  dbService,
  storageService,
  addDatas,
  getDatas,
  updateDatas,
  deleteDatas,
  deleteDocument,
  updateDocument,
  // firstPage,
  // nextPage,
};
