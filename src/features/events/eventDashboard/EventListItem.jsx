import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Header,
  Icon,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import EventListAtendee from "./EventListAtendee";
import { format } from "date-fns";
import { deleteEventInFirestore } from "../../../app/api/firestore/firestoreService";
import { useSelector } from "react-redux";

export default function EventListItem({ event }) {
  const { currentUser } = useSelector((state) => state.auth);
  const isHost = event?.hostUid === currentUser?.uid;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              // Randomized link to try and get dynamic image from lorem picsum
              src={event.hostPhotoURL}
              alt="User image"
            />

            <Item.Content>
              <Item.Header content={event.name} />
              <Item.Meta>
                <Icon name="clock" />
                <span className="start_time">
                  <b>Start Time: </b>
                  {format(event.start_date_time, "HH:mm")}
                </span>
              </Item.Meta>

              <Item.Meta>
                <Icon name="clock" />
                <span className="end_time">
                  <b>End Time: </b>
                  {format(event.end_date_time, "HH:mm")}
                </span>
              </Item.Meta>

              <Item.Description>
                <p>
                  Signed Participants:{" "}
                  {event.attendees && event.attendees.length}
                </p>
                <p>Total Participants: {event.total_participants} </p>
              </Item.Description>

              {event.status && (
                <Label
                  style={{ top: "-40px" }}
                  ribbon="right"
                  color="red"
                  content="This event is Inactive"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="calendar" />
          {format(event.start_date_time, "MMMM d, yyyy")}
          <Icon name="arrows alternate horizontal" />
          {format(event.end_date_time, "MMMM d, yyyy")}
          <Icon name="marker" /> {event.venue.address}
        </span>
      </Segment>

      <Segment secondary>
        <Header size="tiny">Attendees:</Header>
        <List horizontal>
          {event.attendees && event.attendees.length > 0 ? (
            <EventListAtendee attendees={event.attendees} />
          ) : (
            <p color="red">No attendees yet!</p>
          )}
        </List>
      </Segment>

      <Segment clearing>
        <Button
          disabled={currentUser === null ? true : false}
          color="teal"
          floated="right"
          content="View"
          as={Link}
          to={`/events/${event.id}`}
        />

        <Button
          disabled={isHost ? false : true}
          color="red"
          floated="left"
          content="Deactivate"
          onClick={() => deleteEventInFirestore(event.id)}
        />
      </Segment>
    </Segment.Group>
  );
}
