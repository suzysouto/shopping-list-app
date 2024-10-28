import { db } from "../../firebaseConfig"
import { getDoc, doc, setDoc } from "firebase/firestore"
import { ShoppingListTypes } from '../../components/ShoppingList/types' // Importa o tipo de Item que criamos antes

export const saveList = async (uid: string, items: ShoppingListTypes[]) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      items
    })
    console.log("Lista salva com sucesso", docRef)
  } catch (error) {
    console.error("Erro ao salvar a lista:", error)
  }
}

export const getList = async (uid: string): Promise<ShoppingListTypes[]> => {
    try {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      
      // Verifique se o documento existe antes de acessar os dados
      return docSnap.exists() ? (docSnap.data()?.items as ShoppingListTypes[]) : []
    } catch (error) {
      console.error("Erro ao recuperar a lista:", error)
      return []
    }
  }