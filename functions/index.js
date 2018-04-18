const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase Cloud Functions!');
});

exports.insertIntoDB = functions.https.onRequest((req, res) => {
  const text = req.query.text;
  admin.database().ref('/test').push({text: text}).then((snapshot) => {
    return res.redirect(303, snapshot.ref);
  }).catch((e) => e);
});

exports.convertToUppercase = functions.database.ref(`/test/{pushId}/text`).onCreate(snapshot => {
  const text = snapshot.val();
  const uppercaseText = text.toUpperCase();
  return snapshot.ref.parent.child('uppercaseText').set(uppercaseText);
});
