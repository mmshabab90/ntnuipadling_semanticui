import React, { useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import cuid from "cuid";
import { getFileExtension } from "../util/util";
import { uploadToFirebaseStorage } from "../../api/firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../api/firestore/firestoreService";

export default function PhotoUploadWidget({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage() {
    setLoading(true);
    console.log(files[0].name);
    //upload file with diffrent(unique) name even for same image
    const filename = cuid() + "." + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is: ${progress}% done`);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
  }

  return (
    <Grid stackable padded columns={3}>
      <Grid.Column>
        <Header color='teal' sub icon='plus' content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      {/* <Grid.Column width={1} /> */}

      <Grid.Column>
        <Header
          color='teal'
          sub
          icon='expand arrows alternate'
          content='Step 2 - Resize'
        />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      {/* <Grid.Column width={1} /> */}

      <Grid.Column>
        <Header
          color='teal'
          sub
          icon='upload'
          content='Step 3 - Preview and Upload'
        />
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group>
              <Button
                style={{ width: 100 }}
                positive
                icon='check'
                onClick={handleUploadImage}
                loading={loading}
              />
              <Button
                style={{ width: 100 }}
                icon='close'
                onClick={handleCancelCrop}
                disabled={loading}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
