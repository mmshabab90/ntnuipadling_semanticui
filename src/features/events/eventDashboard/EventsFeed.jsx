import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Header, Segment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getUserFeedRef,
} from "../../../app/api/firestore/firebaseService";
import { listenToFeed } from "../../profiles/profileStores/profileActions";
import EventFeedItem from "./EventFeedItem";

export default function EventsFeed() {
  const dispatch = useDispatch();
  const { feed } = useSelector((state) => state.profile);

  useEffect(() => {
    getUserFeedRef().on("value", (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }

      //   most recent events post/feed first
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeed(feed));
    });

    // unsubscribe from feed on unmount
    return () => {
      getUserFeedRef().off();
    };
  }, [dispatch]);

  return (
    <>
      <Header attached color="teal" icon="newspaper" content="Events Feed" />
      <Segment attached="bottom">
        <Feed>
          {feed && feed.length > 0 ? (
            feed.map((post) => <EventFeedItem key={post.id} post={post} />)
          ) : (
            <Header as='h5' color='red'>
             "Nothing to show yet!"
            </Header>
          )}
        </Feed>
      </Segment>
    </>
  );
}
