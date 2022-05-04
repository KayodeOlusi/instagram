// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCMSBP83Ew6GcStXusnUQ52QzlogTminS8',
  authDomain: 'beta-insta-clone.firebaseapp.com',
  projectId: 'beta-insta-clone',
  storageBucket: 'beta-insta-clone.appspot.com',
  messagingSenderId: '697336273765',
  appId: '1:697336273765:web:949077691f26e4fcca1f8c',
  measurementId: 'G-FZTLC3RDRR',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
