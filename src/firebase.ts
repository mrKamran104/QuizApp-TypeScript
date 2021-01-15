import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBy-5b9Ia0m4Kt-KlCJ3KXJ25_ja3ItZPI",
    authDomain: "quiztypescriptpwa.firebaseapp.com",
    projectId: "quiztypescriptpwa",
    storageBucket: "quiztypescriptpwa.appspot.com",
    messagingSenderId: "779122579970",
    appId: "1:779122579970:web:9f9387e46f8995d716651b",
    measurementId: "G-9PZ4Z7C1R1"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging()

const configNotification = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            getToken();
        } else {
            console.log('Unable to get permission to notify.');
        }
    });
}

const getToken = () => {
    messaging.getToken().then((currentToken: string) => {
        if (currentToken) {
            console.log('token', currentToken)
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err: string) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}

export default configNotification;