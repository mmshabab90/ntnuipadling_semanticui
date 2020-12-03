import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  //   convert firestore timestamp to js date object
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  // add doc id to the returned snapshot
  return {
    ...data,
    id: snapshot.id,
  };
}

export function fetchEventsFromFirestore(
  predicate,
  limit,
  lastDocSnapshot = null
) {
  const user = firebase.auth().currentUser;
  let eventsRef = db
    .collection("events")
    .orderBy("start_date_time")
    .startAfter(lastDocSnapshot)
    .limit(limit);

  switch (predicate.get("filter")) {
    case "isGoing":
      return eventsRef
        .where("attendeeIds", "array-contains", user.uid)
        .where("start_date_time", ">=", predicate.get("start_date_time"));

    case "isHost":
      return eventsRef
        .where("hostUid", "==", user.uid)
        .where("start_date_time", ">=", predicate.get("start_date_time"));
    default:
      return eventsRef.where(
        "start_date_time",
        ">=",
        predicate.get("start_date_time")
      );
  }
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

// Create user in firestore user colletion
// If user collection doesn't exist, it will be created
export function setUserProfileData(user) {
  console.log(user);
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

// create event in firestore
export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser;
  return db.collection("events").add({
    ...event,
    hostUid: user.uid,
    hosted_by: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  });
}

// update event in firestore
export function updateEventInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

// delete event in firestore
export function deleteEventInFirestore(eventId) {
  return db.collection("events").doc(eventId).delete();
}

// cancel evenet toggle
export function cancelEventToggle(event) {
  return db.collection("events").doc(event.id).update({
    status: !event.status,
  });
}

export function getUserProfile(userId) {
  return db.collection("users").doc(userId);
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;

  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }

    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

//update user profile photo
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }

    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

// getting user photos
export function getUserPhotos(userUid) {
  return db.collection("users").doc(userUid).collection("photos");
}

//setting profile photo from uploaded ones
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;
  // date from which the documents will be updated
  //note this will update many calls in firebase and will affect the free plan based on number of read/write
  // suggested is to use current date for todays date just use new Date()
  // using current date allows document from today until future to be updated
  // document with start_date_time that is later than today won't be updated
  const today = new Date("01/01/2020");
  const eventDocQuery = db
    .collection("events")
    .where("attendeeIds", "array-contains", user.uid)
    .where("start_date_time", ">=", today);
  const userFollowingRef = db
    .collection("following")
    .doc(user.uid)
    .collection("userFollowing");

  const batch = db.batch();

  // update firestore photos collection
  batch.update(db.collection("users").doc(user.uid), {
    photoURL: photo.url,
  });

  try {
    const eventsQuerySnap = await eventDocQuery.get();
    for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
      let eventDoc = eventsQuerySnap.docs[i];
      // check if user is the host of this particular event then update the host photo url
      if (eventDoc.data().hostUid === user.uid) {
        batch.update(eventsQuerySnap.docs[i].ref, {
          hostPhotoURL: photo.url,
        });
      }

      batch.update(eventsQuerySnap.docs[i].ref, {
        attendees: eventDoc.data().attendees.filter((attendee) => {
          if (attendee.id === user.uid) {
            attendee.photoURL = photo.url;
          }
          return attendee;
        }),
      });
    }

    //update image in following
    const userFollowingSnap = await userFollowingRef.get();
    //same as a for loop || alternative for loop in JS
    userFollowingSnap.docs.forEach((docRef) => {
      let followingDocRef = db
        .collection("following")
        .doc(docRef.id)
        .collection("userFollowers")
        .doc(user.uid);

      batch.update(followingDocRef, {
        photoURL: photo.url,
      });
    });

    // commit changes to following docs
    await batch.commit();

    // update user's profile
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

// delete photo from collection
export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid;
  return db
    .collection("users")
    .doc(userUid)
    .collection("photos")
    .doc(photoId)
    .delete();
}

// join an event
export function addUserAttendance(event) {
  const user = firebase.auth().currentUser;
  return db
    .collection("events")
    .doc(event.id)
    .update({
      attendees: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL || null,
      }),
      attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

// cancel user attendance
export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser;

  try {
    const eventDoc = await db.collection("events").doc(event.id).get();

    return db
      .collection("events")
      .doc(event.id)
      .update({
        attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        attendees: eventDoc
          .data()
          .attendees.filter((attendee) => attendee.id !== user.uid),
      });
  } catch (error) {
    throw error; // throws error back to the component
  }
}

// events for user profile page
export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection("events");
  const today = new Date();

  switch (activeTab) {
    case 1: //past events
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("start_date_time", "<=", today)
        .orderBy("start_date_time", "desc"); //latest events first
    case 2: //hosted events
      return eventsRef
        .where("hostUid", "==", userUid) //shows all events hosted by the user
        .orderBy("start_date_time");
    default:
      return eventsRef
        .where("attendeeIds", "array-contains", userUid)
        .where("start_date_time", ">=", today) //shows only past events
        .orderBy("start_date_time");
  }
}

// following/followers function --> create collection and hook to event
export async function followUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    //create following collection and add user profile
    batch.set(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    );

    // add following count inside users document
    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

// unfollow a user
export async function unfollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();

  try {
    // remove following doc based on user profile
    batch.delete(
      db
        .collection("following")
        .doc(user.uid)
        .collection("userFollowing")
        .doc(profile.id)
    );

    // remove following count inside users document
    batch.update(db.collection("users").doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}

// get followers collection
export function getFollowersCollection(profileId) {
  return db.collection("following").doc(profileId).collection("userFollowers");
}

// get followingss collection
export function getFollowingCollection(profileId) {
  return db.collection("following").doc(profileId).collection("userFollowing");
}

// get follwoing doc --> get whether or not a user is following a particular user
export function getFollowingDoc(profileId) {
  const userUid = firebase.auth().currentUser.uid;

  return db
    .collection("following")
    .doc(userUid)
    .collection("userFollowing")
    .doc(profileId)
    .get();
}

// waiting list function
