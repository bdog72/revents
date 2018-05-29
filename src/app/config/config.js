import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCfQHRnqTmvJzlY6pvzP8WWmVBg9Ha7kNc',
    authDomain: 'revents-e2cfd.firebaseapp.com',
    databaseURL: 'https://revents-e2cfd.firebaseio.com',
    projectId: 'revents-e2cfd',
    storageBucket: 'revents-e2cfd.appspot.com',
    messagingSenderId: '1009264361874'
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
