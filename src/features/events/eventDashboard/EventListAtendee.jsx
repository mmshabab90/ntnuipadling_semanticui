import React from "react";
import { Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventListAtendee({ attendees }) {
  return (
    <List.Item>
      {attendees &&
        attendees.map((attendee) => (
          <Image
            as={Link}
            to={`/profile/${attendee.id}`}
            key={attendee.id}
            size='mini'
            circular
            alt='User-avatar'
            src={attendee.photoURL}
            style={{ marginRight: "5px" }}
          />
        ))}
    </List.Item>
  );
}
