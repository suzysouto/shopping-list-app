// src/services/authService.ts
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User } from "firebase/auth"

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return null
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    console.log("Usuário deslogado com sucesso")
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
  }
}

export const register = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Erro ao registrar usuário:", error)
    return null
  }
}