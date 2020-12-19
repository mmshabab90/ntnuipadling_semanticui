import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import UnauthModal from "../../auth/UnauthModal";
import PhotosSegment from "../newsPhoto/PhotosSegment";

const newsImageStyle = {
  filter: "brightness(10%)",
  opacity: "0.7",
};

const newsImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

export default function NewsDetailedHeader({ news }) {
  const { currentUser } = useSelector((state) => state.auth);
  const isAuthor = news?.authorUid === currentUser?.uid;
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}

      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={news.photoURL || "/assets/images/placeholder_news_img.jpg"}
            fluid
            style={{ newsImageStyle, newsImageTextStyle }}
          />
        </Segment>

        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={news.title}
                  style={{ color: "black" }}
                />

                <p>
                  Author:{" "}
                  <strong>
                    <Link to={`/profile/${news.authorUid}`}>{news.author}</Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        {editMode && <PhotosSegment setEditMode={setEditMode} doc={news} />}

        {isAuthor && (
          <Segment clearing attached="bottom">
            <Button
              as={Link}
              to={`/editNews/${news.id}`}
              color="orange"
              floated="right"
              content="Edit"
            />

            <Button
              onClick={() => setEditMode(!editMode)}
              color={editMode ? "grey" : "teal"}
              floated="left"
              content={editMode ? "Cancel" : "Update Image"}
            />
          </Segment>
        )}
      </Segment.Group>
    </>
  );
}
