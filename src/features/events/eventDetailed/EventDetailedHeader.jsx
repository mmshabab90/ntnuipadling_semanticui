import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Header,
  Button,
  Image,
  Item,
  Label,
  Icon,
} from "semantic-ui-react";

const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

export default function EventDetailedHeader({ event }) {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={event.name}
                  style={{ color: "white" }}
                />
                {/* <div>
                  <span style={{ marginRight: "5px" }}>Status:</span>
                  <Label
                    color={event.status === true ? "green" : "red"}
                    image
                  >
                    {event.status === true ? (
                      <Icon name='calendar check' />
                    ) : (
                      <Icon name='calendar times' />
                    )}
                    <Label.Detail>
                      {event.status === true ? "Active" : "Inactive"}
                    </Label.Detail>
                  </Label>
                </div> */}
                <p>
                  Hosted by: <strong>{event.hosted_by}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment clearing attached='bottom'>
        <Button.Group>
          <Button>Cancel</Button>
          <Button.Or />
          <Button positive>JOIN</Button>
        </Button.Group>

        <Button
          as={Link}
          to={`/manage/${event.id}`}
          color='orange'
          floated='right'
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
