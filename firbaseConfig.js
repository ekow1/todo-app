 // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// //   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
//   import { getFirestore } from "firebase/firestore";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  
  const firebaseConfig = {
    apiKey: "AIzaSyBXonsi4a7lgDRMT24RKbfZdz7xInWX-ms",
    authDomain: "todolive-5f2aa.firebaseapp.com",
    projectId: "todolive-5f2aa",
    storageBucket: "todolive-5f2aa.appspot.com",
    messagingSenderId: "835878827295",
    appId: "1:835878827295:web:044c44c3a5df99baf7ac2a",
    measurementId: "G-BPXQ8S0EHD"
  };

  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
//    firebase.analytics();
  const db = firebase.firestore();
