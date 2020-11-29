import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Grid, Icon } from "semantic-ui-react";
import EventList from "./EventList";
import { listenToEventsFromFirestore } from "./../../../app/api/firestore/firestoreService";
import { listenToEvents } from "../eventsRedux/eventActions";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";

import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";
import EventsFeed from "./EventsFeed";

export default function EventDashboard() {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  // predicate to allow user to set a particular filter
  const [predicate, setPredicate] = useState(
    new Map([
      ["start_date_time", new Date()],
      ["filter", "all"],
    ])
  );
  // state for accordion tab track
  const [activeIndex, setActiveIndex] = useState(0);

  // handle accordion tab click
  function handleAccordionClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });

  return (
    <Grid stackable columns={2}>
      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleAccordionClick}
          >
            <Icon name="dropdown" />
            Feed
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            {authenticated && <EventsFeed />}
          </Accordion.Content>
          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleAccordionClick}
          >
            <Icon name="dropdown" />
            Filter Events
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <EventFilters
              predicate={predicate}
              setPredicate={handleSetPredicate}
              loading={loading}
            />
          </Accordion.Content>
        </Accordion>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={10}>
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
