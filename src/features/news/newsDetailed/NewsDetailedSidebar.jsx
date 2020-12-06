import React from "react";
import { Link } from "react-router-dom";
import { Item, Segment, Header } from "semantic-ui-react";

export default function NewsDetailedSidebar({
  author,
  authorUid,
  authorPhotoURL,
}) {
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        <Header>Author</Header>
      </Segment>

      <Segment attached>
        <Item.Group relaxed divided>
          <Item
            as={Link}
            to={`/profile/${authorUid}`}
            style={{ position: "relative" }}
          >
            <Item.Image
              size="mini"
              circular
              src={authorPhotoURL || "/assets/images/attendee.png"}
            />

            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <span>{author}</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </>
  );
}
