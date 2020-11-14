import React from "react";
import { useState } from "react";
import { Grid, Header, Tab, Button, Card, Image } from "semantic-ui-react";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/api/firestore/firestoreService";
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";
import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import { listenToUserPhotos } from "./../profileStores/profileActions";
import { toast } from "react-toastify";
import { deleteFromFirebaseStorage } from "../../../app/api/firestore/firebaseService";

export default function PhotosTab({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo, target) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={"Photos"} />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Add Photo"}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid>
                    <Button
                      basic
                      color='green'
                      content='Set'
                      name={photo.id}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                    />
                    <Button
                      basic
                      color='red'
                      icon='trash'
                      name={photo.id}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
