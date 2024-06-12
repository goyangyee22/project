import { getAuth, signWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // 로그인이 되었을 때
    const user = userCredential.user;
  })
  // 로그인이 되지 않았을 때
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
