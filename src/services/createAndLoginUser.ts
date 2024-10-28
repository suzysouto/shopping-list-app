
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDTlf_AuVo98cwsYshSWZqjzO8bfKNp08s",
    authDomain: "buy-list-48fd7.firebaseapp.com",
    projectId: "buy-list-48fd7",
    storageBucket: "buy-list-48fd7.appspot.com",
    messagingSenderId: "489974429290",
    appId: "1:489974429290:web:a121b88ad6cc2c6ec6fc13"
};

// Inicializa o Firebase
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Inicializa a autenticação
export const auth = getAuth(app);

// Função para criar um novo usuário
const createUser = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuário registrado com sucesso:", userCredential.user);
        
        // Autenticar o usuário após a criação
        await signInUser(email, password);
    } catch (error) {
        console.error("Erro ao criar usuário:", (error as Error).message);
    }
};

// Função para fazer login do usuário
const signInUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuário autenticado com sucesso:", userCredential.user);
    } catch (error) {
        console.error("Erro ao autenticar:", (error as Error).message);
    }
};

// Exemplo de uso: crie um usuário e faça login
const email = "seu-email@example.com"; // Substitua pelo email desejado
const password = "sua-senha"; // Substitua pela senha desejada
createUser(email, password);
