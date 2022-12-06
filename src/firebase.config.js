import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBID10k59cfnaHaWfPFMDOYdKbzlW75oCI',
  authDomain: 'house-marketpace-app-15220.firebaseapp.com',
  projectId: 'house-marketpace-app-15220',
  storageBucket: 'house-marketpace-app-15220.appspot.com',
  messagingSenderId: '713693476134',
  appId: '1:713693476134:web:17f3d30c1a81557402bde7',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
