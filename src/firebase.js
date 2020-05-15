import app from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAl4vK8VUFMCwBHfDQhZqrHcpXilkE4T9o",
    authDomain: "crud-react-01-46e97.firebaseapp.com",
    databaseURL: "https://crud-react-01-46e97.firebaseio.com",
    projectId: "crud-react-01-46e97",
    storageBucket: "crud-react-01-46e97.appspot.com",
    messagingSenderId: "585379492431",
    appId: "1:585379492431:web:fa11bc2088f79768f0303a"
  };

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth }