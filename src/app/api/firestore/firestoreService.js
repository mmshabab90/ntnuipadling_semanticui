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

export function listenToEventsFromFirestore(predicate) {
  const user = firebase.auth().currentUser;
  let eventsRef = db.collection("events").orderBy("start_date_time");

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

// function to switch gender
function switchGender() {
  let gender = ["men", "women"];
  let genderOut = gender[Math.floor(Math.random() * gender.length)];
  return genderOut;
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

  try {
    // update firestore photos collection
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });
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
