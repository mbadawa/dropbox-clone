import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD7ZlyeERmPY1j6bK7fUh6feRF1o-ZDYVs',
  authDomain: 'dropbox-clone-fe6b1.firebaseapp.com',
  projectId: 'dropbox-clone-fe6b1',
  storageBucket: 'dropbox-clone-fe6b1.appspot.com',
  messagingSenderId: '362346266109',
  appId: '1:362346266109:web:3e5d39352225eaac8ced94',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
