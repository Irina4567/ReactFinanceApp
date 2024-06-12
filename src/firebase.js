import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDFVVyjOshl3sME5J6YUqXcnrko5yq9S8k",
    authDomain: "test-c89d1.firebaseapp.com",
    databaseURL: "https://test-c89d1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-c89d1",
    storageBucket: "test-c89d1.appspot.com",
    messagingSenderId: "93587420426",
    appId: "1:93587420426:web:de6193399cb6ae8cf1f6f3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;