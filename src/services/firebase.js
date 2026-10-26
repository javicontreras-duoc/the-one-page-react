import { initializeApp } from "firebase/app";
import { getFirestore, getAnalytics, collection, addDoc, getDocs} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvPjPQ3cn-2AhId9uXDC_svlIUOE687Q4",
  authDomain: "fullstack2-6bc73.firebaseapp.com",
  projectId: "fullstack2-6bc73",
  storageBucket: "fullstack2-6bc73.firebasestorage.app",
  messagingSenderId: "279148793478",
  appId: "1:279148793478:web:e5892a67fc840fd883cb07",
  measurementId: "G-7HM7646EBD"
};

// Inicialización de la App y Base de Datos
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);