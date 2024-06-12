import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
onAuthStateChanged(auth, (user) =>{
    if(user){
        // 로그인

        const uid = user.uid;
    } else{
        // 로그아웃
    }
})