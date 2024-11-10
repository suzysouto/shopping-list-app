import { db } from "../../firebaseConfig"
import { getDoc, doc, setDoc } from "firebase/firestore"
import { ShoppingListTypes, UserShoppingList } from '../../components/ShoppingList/types' // Importa o tipo UserShoppingList

// Salva a lista e o supermercado
export const saveList = async (uid: string, items: ShoppingListTypes[], supermarket: string) => {
  try {
    const docRef = await setDoc(doc(db, "users", uid), {
      items,
      supermarket, // adiciona o campo de supermercado no documento
    })
    console.log("Lista salva com sucesso", docRef)
  } catch (error) {
    console.error("Erro ao salvar a lista:", error)
  }
}

// Retorna um objeto UserShoppingList com os itens e o supermercado
export const getList = async (uid: string): Promise<UserShoppingList | null> => {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    // Verifique se o documento existe antes de acessar os dados
    return docSnap.exists()
      ? (docSnap.data() as UserShoppingList) // agora retorna UserShoppingList
      : null
  } catch (error) {
    console.error("Erro ao recuperar a lista:", error)
    return null
  }
}
