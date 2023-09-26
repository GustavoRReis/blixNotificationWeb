import { db } from '../config/firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

export async function getTokens() {
  try {
    const tokensRef = query(collection(db, 'tokens'));
    const querySnapshot = await getDocs(tokensRef);
    const tokens = [];
    querySnapshot.forEach((doc) => {
      tokens.push(doc.data().token);
    });
    return tokens;
  } catch (error) {
    console.log(error);
  }
}

export async function addNotification(data) {
  try {
    const result = await addDoc(collection(db, 'notification'), data);
    return result;
  } catch (error) {
    console.log('Erro add post:', error);
    return 'erro';
  }
}
