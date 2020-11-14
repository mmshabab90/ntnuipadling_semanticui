import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Segment, Header, Button, Image, Item } from "semantic-ui-react";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "./../../../app/api/firestore/firestoreService";

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

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);

  async function handleUserJoinEvent() {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserUserLeaveEvent() {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

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

                <p>
                  Hosted by:{" "}
                  <strong>
                    <Link to={`/profile/${event.hostUid}`}>
                      {event.hosted_by}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment clearing attached='bottom'>
        {!isHost && (
          <Button.Group>
            {isGoing ? (
              <Button
                color='orange'
                onClick={handleUserUserLeaveEvent}
                loading={loading}
              >
                Opt out!
              </Button>
            ) : (
              <Button positive onClick={handleUserJoinEvent}>
                Join
              </Button>
            )}
          </Button.Group>
        )}

        {isHost && (
          <Button
            as={Link}
            to={`/manage/${event.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}
