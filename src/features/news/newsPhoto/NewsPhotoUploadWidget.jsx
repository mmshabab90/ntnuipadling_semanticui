import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Progress,
  Segment,
} from "semantic-ui-react";
import { uploadNewsImageToFirebaseStorage } from "../../../app/api/firestore/firebaseService";
import { updateNewsPhoto } from "../../../app/api/firestore/firestoreService";
import NewsPhotoWidgetCroper from "./NewsPhotoWidgetCroper";
import NewsPhotoWidgetDropzone from "./NewsPhotoWidgetDropzone";
// import cuid from "cuid";
import { toast } from "react-toastify";
import { getFileExtension } from "../../../app/common/util/util";

export default function NewsPhotoUploadWidget({ setEditMode, doc }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progressUpdate, setProgressUpdate] = useState(0);

  function handleUploadImage() {
    setLoading(true);
    const filename = "img-" + doc.title + "." + getFileExtension(files[0].name);
    const uploadTask = uploadNewsImageToFirebaseStorage(
      image,
      filename,
      doc.id
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUpdate(progress);
        console.log("Upload is: " + progress + "% done");
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateNewsPhoto(downloadURL, filename, doc.id)
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
    <Segment basic>
      {loading && (
        <Progress
          attached="top"
          percent={progressUpdate}
          color="olive"
          active
        />
      )}

      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <NewsPhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 2 - Resize" />
          {files.length > 0 && (
            <NewsPhotoWidgetCroper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />

        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 3 - Preview & upload" />
          {files.length > 0 && (
            <Container fluid>
              <div
                className="img-preview"
                style={{
                  minHeight: 220,
                  minWidth: 300,
                  overflow: "hidden",
                }}
              />

              <Button.Group>
                <Button
                  positive
                  icon="check"
                  style={{ width: 150 }}
                  loading={loading}
                  onClick={handleUploadImage}
                />
                <Button
                  negative
                  icon="close"
                  style={{ width: 150 }}
                  disabled={loading}
                  onClick={handleCancelCrop}
                />
              </Button.Group>
            </Container>
          )}
        </Grid.Column>
      </Grid>

      {loading && (
        <Progress
          attached="bottom"
          percent={progressUpdate}
          color="olive"
          active
        />
      )}
    </Segment>
  );
}
