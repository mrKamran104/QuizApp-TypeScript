importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js')

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBy-5b9Ia0m4Kt-KlCJ3KXJ25_ja3ItZPI",
    authDomain: "quiztypescriptpwa.firebaseapp.com",
    projectId: "quiztypescriptpwa",
    storageBucket: "quiztypescriptpwa.appspot.com",
    messagingSenderId: "779122579970",
    appId: "1:779122579970:web:9f9387e46f8995d716651b",
    measurementId: "G-9PZ4Z7C1R1"
});

// Retrieve Firebase Messaging object.
firebase.messaging();
