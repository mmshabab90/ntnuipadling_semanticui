import React from "react";
import { Segment } from "semantic-ui-react";
import NewsPhotoUploadWidget from "./NewsPhotoUploadWidget";
// import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
// import { getNewsPhotos } from "../../../app/api/firestore/firestoreService";
import { useSelector } from "react-redux";
// import { listenToNewsPhotos } from "../newsRedux/newsActions";

export default function PhotosSegment({ setEditMode, doc }) {
  // const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  // const { photos } = useSelector((state) => state.news);

  //   useFirestoreCollection({
  //     query: () => getNewsPhotos(doc.id),
  //     data: (photos) => dispatch(listenToNewsPhotos(photos)),
  //     deps: [doc.id, dispatch],
  //   });

  return (
    <Segment.Group loading={loading}>
      <NewsPhotoUploadWidget setEditMode={setEditMode} doc={doc} />

      {/* <Segment basic>
        <Card.Group stackable itemsPerRow={2}>
          {photos.map((photo) => (
            <Card key={photo.id}>
              <Image src={"/assets/images/placeholder_news_img.jpg"} />
              <Button.Group fluid widths={2}>
                <Button basic color="green" content="Main" />
                <Button basic color="red" content="Delete" />
              </Button.Group>
            </Card>
          ))}
        </Card.Group>
      </Segment> */}
    </Segment.Group>
  );
}
