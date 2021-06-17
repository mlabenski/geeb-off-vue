const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const usersCollection = db.collection("queue");


function time(minutes) {
    if (minutes>29) {
        return 0;
    }
    else {
        return 30;
    }
}

exports.request = functions.https.onCall(async (data, context) => {
    const user = data.user;
    var date = new Date();
    var dateJoined = time(date.getMinutes());
    if(!(typeof user === 'string') || user.length === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
        'one arguments "text" containing the message text to add.');
    }
    return await admin.firestore().collection('queue').add({
        user: user,
        timeJoined: dateJoined,
        round: 0,
        failed: false,
        currentTime: [0,0],
        votes: 0
    }).then(() => {
        console.log('User added to the queue');
        return {user: user, timeJoined: dateJoined, round: 0, failed: false, currentTime: [0,0], votes: 0};
    });
});




exports.scheduledMatchUpdateV2 = functions.pubsub.schedule('*/10 * * * *').onRun(async (context) => {
    const db = admin.firestore();
    var date = new Date();
    //once we figure this out, we can compare the invididuals join date to hte server time to decide if their in the queue.
    timeNow = date.getMinutes();
    let batch = db.batch();
    let queueBatch = db.batch();
    let currentQueue = db.collection('queue');
    currentQueue.get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            querySnapshot.forEach(doc => {
                let docData = doc.data();
                if (docData.timeJoined == 30 || docData.timeJoined == 0);
                {
                 console.log("time equals correctly");
                }
                console.log(doc.id, ' => ', doc.data());
                const matchLobby = db.doc(`match/${docData.user}`);
                batch.set(matchLobby, doc.data());
                db.collection('queue').doc(doc.id).delete();
        });
        return batch.commit();
        }
    })
    .catch(err => {
        return Promise.reject(err);
    })
});


exports.changePlayer = functions.pubsub.schedule('*/2 * * * *').onRun(async (context) => {
        const db = admin.firestore();
        let lobbyDB = db.collection('match');
        let currentPlayerDB = db.collection('currentPlayerDB');
        var roundNumbers = [];
        // gather the round number of every one in the game to determine who goes next..
        lobbyDB.get().then(function(querySnapshot) {
            for (var i in querySnapshot.docs){
                const doc = querySnapshot.docs[i];
                let docData = doc.data();
                roundNumbers.push(docData.round);
            }
        }).then(
        lobbyDB.get().then(function(querySnapshot) {
            currentPlayerDB.get().then(function(querySnapshotDB) {
                // delete the last geeber from the current player database.
                for (var i in querySnapshotDB.docs) {
                    if (i >= 0) {
                        const doc = querySnapshotDB.docs[i];
                        let docData = doc.data();
                        if(docData.votes == -1) {
                            db.collection('match').doc(doc.id).delete();
                        }
                        db.collection('currentPlayerDB').doc(doc.id).delete();
                    }
                }
                // Find the next player to take a geeb, remove them if they lost in the previous round
                for(var i in querySnapshot.docs) {
                    var date = new Date();
                        let batch = db.batch();
                        const doc = querySnapshot.docs[i];
                        let docData = doc.data();
                        if (Math.min(...roundNumbers)== docData.round){
                            // Once the viewers can vote on the player failing: then we will switch the logic to 
                            // exlude the docDa
                            if (docData.failed == true) {
                                db.collection('match').doc(doc.id).delete();
                                console.log(`${docData.user} has failed the round, removing from database`);
                                return true;
                            }
                            // We entered the logic that enters the current geeber into the currentPlayerDB
                            const currentPlayer = db.doc(`currentPlayerDB/${docData.user}`);
                            batch.set(currentPlayer, doc.data());
                            let nextRound = docData.round+1;
                            let minutes = date.getMinutes();
                            let seconds = date.getSeconds();
                            var time = [];
                            return batch.commit().then(function() {
                                //once we figure this out, we can compare the invididuals join date to hte server time to decide if their in the queue.
                                    console.log(`added a new player ${docData.user}`)
                                    time.push(minutes);
                                    time.push(seconds);
                                    db.collection('match').doc(doc.id).update({round: nextRound});
                                    db.collection('match').doc(doc.id).update({currentTime: time});
                                    return true;
                            })

                    }
                }
            })
        }));  
});