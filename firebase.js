// SDK에서 필요한 기능을 가져옵니다.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth-compat.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore-compat.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-storage-compat.js'

// Firebase 프로젝트 구성으로 설정합니다.
const firebaseConfig ={
    apiKey: "AIzaSyAacCYNcsw241GRaLn9A5jUuS0hm0qbxbs",
    authDomain: "project-52d4c.firebaseapp.com",
    projectId: "project-52d4c",
    storageBucket: "project-52d4c.appspot.com",
    messagingSenderId: "587892298418",
    appId: "1:587892298418:web:43d4e281e654f11750efab",
    measurementId: "G-ZY1J3CGR0E"
}

export const app = initializeApp(firebaseConfig);
export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);

