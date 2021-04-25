import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import UnauthModal from "../../auth/UnauthModal";
import { deleteInfo } from "../infoRedux/infoActions";
import InfoPhotoWidget from "./InfoPhotoWidget";

const infoImageStyle = {
  filter: "brightness(10%)",
  opacity: "0.7",
};

const infoImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

export default function InfoDetailHeader({ info, photo }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);
  const isAuthor = info?.authorUid === currentUser?.uid;
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteInfo(info.id, photo?.name, photo?.id));
    } catch (error) {
      //   console.log(error);
    }
  };

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}

      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={info.photoURL || "/assets/images/placeholder_news_img.jpg"}
            fluid
            style={{ infoImageStyle, infoImageTextStyle }}
          />
        </Segment>

        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={info.title}
                  style={{ color: "black" }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        {editMode && (
          <Segment.Group loading={loading}>
            <InfoPhotoWidget setEditMode={setEditMode} doc={info} />
          </Segment.Group>
        )}

        {isAuthor && (
          <Segment clearing attached="bottom">
            <Button
              as={Link}
              to={`/editInfo/${info.id}`}
              color="orange"
              floated="left"
              content="Edit"
            />

            <Button
              onClick={() => setEditMode(!editMode)}
              color={editMode ? "grey" : "teal"}
              floated="left"
              content={editMode ? "Cancel" : "Update Image"}
            />

            <Button
              onClick={handleDelete}
              color="red"
              floated="right"
              content="Delete"
            />
          </Segment>
        )}
      </Segment.Group>
    </>
  );
}
