import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD68g8SP-9yJcsNF6sdllrSmEvCearGaFQ',
  authDomain: 'music-player-91217.firebaseapp.com',
  projectId: 'music-player-91217',
  storageBucket: 'music-player-91217.appspot.com',
  appId: '1:852543514881:web:88792f7c6496a550afd300',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  // eslint-disable-next-line no-alert
  alert('Firebase presistence error', error);
});

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  storage,
  songsCollection,
  commentsCollection,
};
