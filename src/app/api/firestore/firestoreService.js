import firebase from "../config/firebase";
import cuid from "cuid";

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

export function listenToEventsFromFirestore() {
  return db.collection("events").orderBy("start_date_time");
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
  return db.collection("events").add({
    ...event,
    hosted_by: `User ${Math.floor(Math.random() * 10)}`,
    hostPhotoURL: `https://randomuser.me/api/portraits/${switchGender()}/${Math.floor(
      Math.random() * 100
    )}.jpg`,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: `User ${Math.floor(Math.random() * 10)}`,
      photoURL: `https://randomuser.me/api/portraits/${switchGender()}/${Math.floor(
        Math.random() * 100
      )}.jpg`,
    }),
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
