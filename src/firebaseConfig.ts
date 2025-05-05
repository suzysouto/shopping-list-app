import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDTlf_AuVo98cwsYshSWZqjzO8bfKNp08s",
  authDomain: "buy-list-48fd7.firebaseapp.com",
  projectId: "buy-list-48fd7",
  storageBucket: "buy-list-48fd7.appspot.com",
  messagingSenderId: "489974429290",
  appId: "1:489974429290:web:a121b88ad6cc2c6ec6fc13"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig)

// Inicializando o Auth e Firestore
export const auth = getAuth(app)
export const db = getFirestore(app)
auth.useDeviceLanguage()

// Fazendo login pela conta Google
export const googleProvider = new GoogleAuthProvider()
