import {initializeApp} from 'firebase/app';
import {addDoc, collection, doc, DocumentData, DocumentSnapshot, FieldValue, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, serverTimestamp, setDoc, where}from 'firebase/firestore';
import {Auth, getAuth, GoogleAuthProvider, signInWithPopup, User as FirebaseUser} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyAbfWtrqxAlyvEJTYO0tTvH3ntxI7sz9MQ",
    authDomain: "whatsappclone-465da.firebaseapp.com",
    projectId: "whatsappclone-465da",
    storageBucket: "whatsappclone-465da.appspot.com",
    messagingSenderId: "621178491742",
    appId: "1:621178491742:web:c6362327a38c7e1ee235cf"
  };
  

  const app = initializeApp(firebaseConfig)


  const dbApp = getFirestore(app)
  const authApp = getAuth(app);


  interface CodeBlock {
    code: string;
    language: string;
    theme: string;
    title?: string;
  }
  const GetCodeBlock = async(codeId:string) => {
      try {
        const ref = doc(dbApp, "codeBlocks", codeId)
        const data = await getDoc(ref)
        if(!data.exists()) throw {message: "This code block does not exist"}
        if(!data.data()) throw {message: "This code block is empty"}
        return {
          data: data.data() as CodeBlock,
          valid: true
        }
      } catch(e:any){
        return {
          data: e.message,
          valid: false
        }
      }
  }

  const SaveCodeBlock = async({code, language, title, theme}: CodeBlock) => {
    try {
      const ref = collection(dbApp, "codeBlocks")
      const f = await addDoc(ref, {
        code: code,
        language: language,
        theme: theme,
        title: title
      })
  
      return {
        url: '/codeBlocks/'+f.id,
        valid: true
      }
    } catch(e) {
      const ref = doc(dbApp, "codeBlocks")
      await setDoc(ref, {
        code: code,
        language: language
      })
  
      return {
        valid: false
      }
    }
    
  }

  export {dbApp, authApp, GetCodeBlock, SaveCodeBlock};