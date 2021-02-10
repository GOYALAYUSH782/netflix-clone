import firbase from 'firebase';
import firebaseConfig from './config';

const app = firbase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = firbase.auth();
const provider = new firbase.auth.GoogleAuthProvider();

export { auth, provider };
export default db; 
