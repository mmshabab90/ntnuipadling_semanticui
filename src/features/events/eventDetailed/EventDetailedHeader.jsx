import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Segment, Button, Image } from "semantic-ui-react";
import {
  addUserAttendance,
  cancelUserAttendance,
  deleteEventInFirestore,
} from "./../../../app/api/firestore/firestoreService";
import UnauthModal from "../../../features/auth/UnauthModal";

const eventImageStyle = {
  filter: "brightness(100%)",
};

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false);
  const { authenticated } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

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

  async function deleteEvent() {
    try {
      await deleteEventInFirestore(event.id).then((res) =>
        history.push("/events")
      );
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {modalOpen && <UnauthModal setModalOpen={setModalOpen} />}
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            // src={`/assets/categoryImages/${event.category}.jpg`}
            src={`/assets/images/placeholder_bg_img.jpg`}
            fluid
            style={eventImageStyle}
          />

          {/* <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.name}
                    style={{ color: "white" }}
                  />
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment> */}
        </Segment>

        <Segment clearing attached="bottom">
          {!isHost && (
            <Button.Group>
              {isGoing ? (
                <Button
                  color="orange"
                  onClick={handleUserUserLeaveEvent}
                  loading={loading}
                >
                  Opt out!
                </Button>
              ) : (
                <Button
                  disabled={
                    event?.attendeeIds.length >= event?.total_participants ||
                    event?.status
                  }
                  positive
                  onClick={
                    authenticated
                      ? handleUserJoinEvent
                      : () => setModalOpen(true)
                  }
                >
                  Join
                </Button>
              )}

              {event?.attendeeIds.length >= event?.total_participants &&
                !isGoing && (
                  <Button
                    basic
                    color="orange"
                    onClick={() => console.log("Add to waiting list")}
                  >
                    Add to waiting list
                  </Button>
                )}
            </Button.Group>
          )}

          {isHost && (
            <>
              <Button
                as={Link}
                to={`/manage/${event.id}`}
                color="orange"
                floated="right"
              >
                Manage Event
              </Button>

              <Button floated="left" color="red" onClick={deleteEvent}>
                Delete
              </Button>
            </>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
}
