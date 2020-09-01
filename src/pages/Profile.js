/** Front-end needed */

import firebase from 'firebase'

function PostData() {
    let key = firebase.database().ref().child('data').push.key();
    let updates = {} //Data
    return firebase.database.ref().update(updates);
}
