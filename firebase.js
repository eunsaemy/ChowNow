// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDViE5e2Ag9dWhm9ZWGvz_OCtuAiF1VpCs",
    authDomain: "chownow-a7be9.firebaseapp.com",
    projectId: "chownow-a7be9",
    storageBucket: "chownow-a7be9.appspot.com",
    messagingSenderId: "370805471132",
    appId: "1:370805471132:web:fde6e75e09e5bb66e4ba59"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
