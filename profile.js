import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;
if(user !== null){
    // 기본 속성
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // 고유 사용자 ID
    const uid = user.uid;
}