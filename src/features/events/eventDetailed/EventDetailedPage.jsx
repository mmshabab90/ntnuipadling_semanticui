import React from "react";
import { Grid } from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSidebar";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import {
  getEventPhotos,
  listenToEventFromFirestore,
} from "./../../../app/api/firestore/firestoreService";
import {
  getEventPhoto,
  listenToSelectedEvent,
} from "./../eventsRedux/eventActions";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

export default function EventDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector((state) => state.event.selectedEvent);
  const { loading, error } = useSelector((state) => state.async);
  const isHost = event?.hostUid === currentUser?.uid;
  //tells us whether current user is in the attendees list
  const isGoing = event?.attendees?.some((a) => a.id === currentUser?.uid);
  const photos = useSelector((state) => state.event.photos);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  useFirestoreCollection({
    query: () => getEventPhotos(match.params.id),
    data: (photos) => dispatch(getEventPhoto(photos)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid stackable>
      <Grid.Column width={10}>
        <EventDetailedHeader
          event={event}
          isGoing={isGoing}
          isHost={isHost}
          photo={photos[0]}
        />
        <EventDetailedInfo event={event} />
        <EventDetailedChat eventId={event.id} eventInactive={event?.status} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar
          attendees={event.attendees}
          hostUid={event.hostUid}
        />
      </Grid.Column>
    </Grid>
  );
}
