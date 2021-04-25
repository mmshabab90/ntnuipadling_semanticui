import React from "react";
import { Segment } from "semantic-ui-react";
import NewsPhotoUploadWidget from "./NewsPhotoUploadWidget";
import { useSelector } from "react-redux";

export default function PhotosSegment({ setEditMode, doc }) {
  const { loading } = useSelector((state) => state.async);

  return (
    <Segment.Group loading={loading}>
      <NewsPhotoUploadWidget setEditMode={setEditMode} doc={doc} />
    </Segment.Group>
  );
}
