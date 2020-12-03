import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment, Header, Segment } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/api/firestore/firebaseService";
import { listenToEventChat } from "../eventsRedux/eventActions";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { Link } from "react-router-dom";
import { CLEAR_COMMENTS } from "../eventsRedux/eventConstants";
import { createDataTree } from "../../../app/common/util/util";

export default function EventDetailedChat({ eventId }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.event);
  const { authenticated } = useSelector((state) => state.auth);
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
      if (!snapshot.exists()) return;

      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    return () => {
      dispatch({ type: CLEAR_COMMENTS }); //return clear comments on component update
      getEventChatRef().off(); //turns off listener for event chat
    };
  }, [eventId, dispatch]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>
          {authenticated
            ? "Chat about this event"
            : "Login to view and comment"}
        </Header>
      </Segment>

      {authenticated && (
        <Segment attached clearing>
          <EventDetailedChatForm
            eventId={eventId}
            parentId={0}
            closeForm={setShowReplyForm}
          />

          <Comment.Group>
            {createDataTree(comments).map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar
                  src={comment.photoURL || "/assets/images/attendee.png"}
                />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, new Date())}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    {comment.text.split("\n").map((text, i) => (
                      <span key={i}>
                        {text}
                        <br />
                      </span>
                    ))}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() =>
                        setShowReplyForm({
                          open: !showReplyForm.open,
                          commentId: comment.id,
                        })
                      }
                      style={{ marginBottom: 5 }}
                    >
                      Reply
                    </Comment.Action>
                    {showReplyForm.open &&
                      showReplyForm.commentId === comment.id && (
                        <EventDetailedChatForm
                          eventId={eventId}
                          parentId={comment.id}
                          closeForm={handleCloseReplyForm}
                        />
                      )}
                  </Comment.Actions>
                </Comment.Content>

                {comment.childNodes.length > 0 && (
                  <Comment.Group>
                    {comment.childNodes.reverse().map((child) => (
                      <Comment key={child.id}>
                        <Comment.Avatar
                          src={child.photoURL || "/assets/images/attendee.png"}
                        />
                        <Comment.Content>
                          <Comment.Author
                            as={Link}
                            to={`/profile/${child.uid}`}
                          >
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{formatDistance(child.date, new Date())}</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            {child.text.split("\n").map((text, i) => (
                              <span key={i}>
                                {text}
                                <br />
                              </span>
                            ))}
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() =>
                                setShowReplyForm({
                                  open: !showReplyForm.open,
                                  commentId: child.id,
                                })
                              }
                              style={{ marginBottom: 5 }}
                            >
                              Reply
                            </Comment.Action>
                            {showReplyForm.open &&
                              showReplyForm.commentId === child.id && (
                                <EventDetailedChatForm
                                  eventId={eventId}
                                  parentId={child.parentId}
                                  closeForm={handleCloseReplyForm}
                                />
                              )}
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    ))}
                  </Comment.Group>
                )}
              </Comment>
            ))}
          </Comment.Group>
        </Segment>
      )}
    </>
  );
}
