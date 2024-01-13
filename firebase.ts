import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDMYN1_dLT47XDD2B1bA0WheEnuvJ_UuYE',
  authDomain: 'superdrive-app.firebaseapp.com',
  projectId: 'superdrive-app',
  storageBucket: 'superdrive-app.appspot.com',
  messagingSenderId: '646405398106',
  appId: '1:646405398106:web:381ac458ecaf267269c263',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
