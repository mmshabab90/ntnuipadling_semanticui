import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAtendee from "./EventListAtendee";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../eventsRedux/eventActions";
import { format } from "date-fns";

export default function EventListItem({ event }) {
  const dispatch = useDispatch();

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
                <p>Signed Participants: {event.signed_participants}</p>
                <p>Total Participants: {event.total_participants} </p>
              </Item.Description>
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
          <Icon name="marker" /> Venue
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
          color="teal"
          floated="right"
          content="View"
          as={Link}
          to={`/events/${event.id}`}
        />

        <Button
          color="red"
          floated="left"
          content="Delete"
          onClick={() => dispatch(deleteEvent(event.id))}
        />
      </Segment>
    </Segment.Group>
  );
}
