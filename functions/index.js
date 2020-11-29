const functions = require("firebase-functions");
//full power to database with admin
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// ref to firebase firestore db
const db = admin.firestore();

// add following firestore function
// triggeres with currently logged in user
exports.addFollowing = functions.firestore
  .document("/following/{userUid}/userFollowing/{profileId}")
  .onCreate(async (snapshot, context) => {
    // allows to get all the data from following doc
    const following = snapshot.data();
    console.log({ following });
    try {
      // get currently logged in user doc to populate profile card for following collection
      const userDoc = await db
        .collection("users")
        .doc(context.params.userUid)
        .get();
      // for successful transaction batch is used
      const batch = db.batch();
      // create followers collection and add user
      batch.set(
        db
          .collection("following")
          .doc(context.params.profileId)
          .collection("userFollowers")
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );

      // add followers count inside users document || return for loading indicator
      batch.update(db.collection("users").doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });

      // update/push to firestore
      return await batch.commit();
    } catch (error) {
      return console.log(error); //generated on server-side
    }
  });

// remove followings from firestore with firebase functions
// triggeres with on delete
exports.removeFollowing = functions.firestore
  .document("/following/{userUid}/userFollowing/{profileId}")
  .onDelete(async (snapshot, context) => {
    const batch = db.batch();

    // remove followers doc based on profile
    batch.delete(
      db
        .collection("following")
        .doc(context.params.profileId)
        .collection("userFollowers")
        .doc(context.params.userUid)
    );

    // remove followers count inside users document || return for loading indicator
    batch.update(db.collection("users").doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });

    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

// when someone is following someone events of that persion
//will show new feed for joining or opting out
//can be used to send email to waiting list [<--TODO]
// trigger: when an event is updated
exports.eventUpdated = functions.firestore
  .document("events/{eventId}")
  .onUpdate(async (snapshot, context) => {
    // before snapshot
    const before = snapshot.before.data();
    // after snapshot
    const after = snapshot.after.data();

    // for joining an event to use in event feed
    if (before.attendees.length < after.attendees.length) {
      let attendeeJoined = after.attendees.filter(
        (item1) => !before.attendees.some((item2) => item2.id === item1.id)
      )[0];
      // log in firebase [for debugging purpose]
      console.log({ attendeeJoined });

      try {
        // [TODO -->] target the waiting list and get users in the waiting list to send email to each of them
        const followerDocs = await db
          .collection("following")
          .doc(attendeeJoined.id)
          .collection("userFollowers")
          .get();

        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeJoined,
                "joined-event",
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }

    // for opting out of an event to use in event feed
    if (before.attendees.length > after.attendees.length) {
      let attendeeLeft = before.attendees.filter(
        (item1) => !after.attendees.some((item2) => item2.id === item1.id)
      )[0];
      // log in firebase [for debugging purpose]
      console.log({ attendeeLeft });

      try {
        const followerDocs = await db
          .collection("following")
          .doc(attendeeLeft.id)
          .collection("userFollowers")
          .get();

        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                attendeeLeft,
                "left-event",
                context.params.eventId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }

    return console.log("finished event function triggered on event update");
  });

// fuction for creating new posts
function newPost(user, code, eventId, event) {
  return {
    photoURL: user.photoURL,
    date: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.displayName,
    eventId,
    userUid: user.id,
    title: event.name,
  };
}
