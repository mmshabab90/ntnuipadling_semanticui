import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { listenToEventsFromFirestore } from "./../../../app/api/firestore/firestoreService";
import { listenToEvents } from "../eventsRedux/eventActions";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  // predicate to allow user to set a particular filter
  const [predicate, setPredicate] = useState(
    new Map([
      ["start_date_time", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  return (
    <Grid stackable>
      <Grid.Column width={6}>
        <EventFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>

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
    </Grid>
  );
}
