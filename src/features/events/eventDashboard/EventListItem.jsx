import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAtendee from "./EventListAtendee";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../eventsRedux/eventActions";

export default function EventListItem({ event }) {
  const dispatch = useDispatch();

  // Convert mysql date format to js UTC date
  const convertDate = (date) => {
    let dtf = new Date(date);
    let yyyy = dtf.getUTCFullYear();
    let mm = dtf.getUTCMonth();
    let dd = dtf.getUTCDate();

    return dd + "/" + mm + "/" + yyyy;
  };

  // Convert mysql date format to js UTC time
  // const convertTime = (date) => {
  //   let dtf = new Date(date);
  //   let hh = dtf.getUTCHours();
  //   let mm = dtf.getUTCMinutes();
  //   let ss = dtf.getUTCSeconds();

  //   return hh + ":" + mm + ":" + ss;
  // };

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
                  {event.start_time}
                </span>
              </Item.Meta>

              <Item.Meta>
                <Icon name="clock" />
                <span className="end_time">
                  <b>End Time: </b>
                  {event.end_time}
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
          <Icon name="calendar" /> [{convertDate(event.start_date)} -{" "}
          {convertDate(event.end_date)}]
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
