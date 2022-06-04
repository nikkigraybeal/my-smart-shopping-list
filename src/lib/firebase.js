// NOTE: import only the Firebase modules that you need in your app.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyDhjr36myF72PrCZAvBq7GYp61FoM9vEeA',
  authDomain: 'my-smart-shopping-list-61a15.firebaseapp.com',
  projectId: 'my-smart-shopping-list-61a15',
  storageBucket: 'my-smart-shopping-list-61a15.appspot.com',
  messagingSenderId: '463693271504',
  appId: '1:463693271504:web:c6e0be76ffbcf9bc9f29d5',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
