const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const queueCollection = db.collection("queue");
const matchCollection = db.collection('match');
const currentPlayerCollection = db.collection('currentPlayerDB');

const roundDownToNearestHalfHour = (minutes) => minutes > 29 ? 0 : 30;

exports.request = functions.https.onCall(async (data, context) => {
    const user = data.user;
    const dateJoined = roundDownToNearestHalfHour(new Date().getMinutes());

    if (!(typeof user === 'string' && user.length > 0)) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }
    try {
        const userData = {
            user: user,
            timeJoined: dateJoined,
            round: 0,
            failed: false,
            currentTime: [0, 0],
            votes: 0
        };
        await queueCollection.add(userData);
        console.log('User added to the queue');
        return userData;
    } catch (error) {
        console.error('Error adding user to the queue', error);
    }
});

exports.scheduledMatchUpdateV2 = functions.pubsub.schedule('*/10 * * * *').onRun(async (context) => {
    try {
        const timeNow = new Date().getMinutes();
        let batch = db.batch();
        const querySnapshot = await queueCollection.get();

        if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
                const docData = doc.data();
                if (docData.timeJoined === 30 || docData.timeJoined === 0) {
                    console.log("time equals correctly");
                }
                console.log(doc.id, ' => ', docData);
                const matchLobby = matchCollection.doc(docData.user);
                batch.set(matchLobby, docData);
                batch.delete(queueCollection.doc(doc.id));
            });
            await batch.commit();
        }
    } catch (error) {
        console.error('Error updating match', error);
    }
});

exports.changePlayer = functions.pubsub.schedule('*/2 * * * *').onRun(async (context) => {
    try {
        let roundNumbers = [];
        const matchSnapshot = await matchCollection.get();
        matchSnapshot.forEach(doc => roundNumbers.push(doc.data().round));
        
        const currentPlayerSnapshot = await currentPlayerCollection.get();
        currentPlayerSnapshot.forEach(doc => {
            if (doc.data().votes === -1) {
                matchCollection.doc(doc.id).delete();
            }
            currentPlayerCollection.doc(doc.id).delete();
        });

        const nextRoundNumber = Math.min(...roundNumbers);
        matchSnapshot.forEach(doc => {
            const docData = doc.data();
            if (docData.round === nextRoundNumber) {
                if (docData.failed) {
                    console.log(`${docData.user} has failed the round, removing from database`);
                    matchCollection.doc(doc.id).delete();
                } else {
                    const currentTime = [new Date().getMinutes(), new Date().getSeconds()];
                    currentPlayerCollection.doc(docData.user).set(docData);
                    matchCollection.doc(doc.id).update({ round: docData.round + 1, currentTime });
                    console.log(`added a new player ${docData.user}`);
                }
            }
        });
    } catch (error) {
        console.error('Error changing player', error);
    }
});
