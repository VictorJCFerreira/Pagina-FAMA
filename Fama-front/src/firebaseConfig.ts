import * as firebase from 'firebase/app'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc, getDocs } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDknGkCaS7VpaImfBFwEU5-DcfDkhmcDrg",
  authDomain: "pagina-fama.firebaseapp.com",
  projectId: "pagina-fama",
  storageBucket: "pagina-fama.appspot.com",
  messagingSenderId: "534481610213",
  appId: "1:534481610213:web:ff392bfff1dc0a7bfdbb0c",
  measurementId: "G-QFWLL8Q7WJ"

}

const app = firebase.initializeApp(config)

const auth = getAuth()
export async function loginUser(email: string, senha: string) {
    try{

        const res = await signInWithEmailAndPassword(auth, email, senha)

        console.log(res)
        return true
    }
        catch(error){
        console.log(error)
        return false
        }
    
}
export async function registerUser(email: string, senha: string) {
    try{

        const res = await createUserWithEmailAndPassword(auth, email, senha)

        console.log(res)
        return true
    }
    catch (error) {
        console.log(error)
        return false
    }
}

const db = getFirestore(app);
try {
    const docRefAdmin = await addDoc(collection(db, "users"), {
      email: 'adm@gmail.com',
      senha: '1234567',
      role: 'admin'
    });
    console.log("Document written with ID: ", docRefAdmin.id);

    const docRefUser = await addDoc(collection(db, "users"), {
      email: 'eng@gmail.com',
      senha: '1234567',
      role: 'user'
    });
    console.log("Document written with ID: ", docRefUser.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });

  export async function getUserRole(email: string) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userDoc = querySnapshot.docs.find((doc) => doc.data().email === email);
      
      if (userDoc) {
        return userDoc.data().role;
      }
    } catch (error) {
      console.error("Error getting user role:", error);
    }
    return null; 
  }