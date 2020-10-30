import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import {
  getEventsFromFirestore,
  dataFromSnapshot,
} from "./../../../app/api/firestore/firestoreService";
import { listenToEvents } from "../eventsRedux/eventActions";
import { useDispatch } from "react-redux";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

export default function EventDashboard() {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = getEventsFromFirestore({
  //     next: (snapshot) =>
  //       listenToEvents(
  //         snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
  //       ),
  //     error: (error) => console.log(error),
  //   });
  //   return unsubscribe;
  // });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <EventList events={events} />
        )}
      </Grid.Column>

      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
