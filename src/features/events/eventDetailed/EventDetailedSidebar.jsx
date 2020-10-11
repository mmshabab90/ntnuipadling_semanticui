import React from "react";
import { Item, Segment } from "semantic-ui-react";

export default function EventDetailedSidebar({ attendees }) {
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
        {attendees.length} {attendees.length > 1 ? "People" : "Person"} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees &&
            attendees.map((attendee) => (
              <Item key={attendee.id} style={{ position: "relative" }}>
                <Item.Image
                  size="mini"
                  circular
                  src={attendee.photoURL || "/assets/images/attendee.png"}
                />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{attendee.displayName}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </Segment>
    </>
  );
}
