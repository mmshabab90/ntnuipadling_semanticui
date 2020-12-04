import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Grid, Icon, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { fetchEvents } from "../eventsRedux/eventActions";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import EventsFeed from "./EventsFeed";
import { useEffect } from "react";
import { RETAIN_STATE } from "../eventsRedux/eventConstants";

export default function EventDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {
    events,
    moreEvents,
    filter,
    startDateTime,
    lastVisible,
    retainState,
  } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);
  //local state
  const [loadingInitial, setLoadingInitial] = useState(false);

  // state for accordion tab track
  const [activeIndex, setActiveIndex] = useState(0);

  // handle accordion tab click
  function handleAccordionClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  useEffect(() => {
    if (retainState) return;

    setLoadingInitial(true);
    dispatch(fetchEvents(filter, startDateTime, limit)).then(() => {
      setLoadingInitial(false);
    });

    // when component unmounts
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDateTime, retainState]);

  // handle next batch of events
  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDateTime, limit, lastVisible));
  }

  return (
    <Grid stackable columns={2}>
      <Grid.Column mobile={16} tablet={6} computer={6}>
        <Accordion>
          {authenticated && (
            <>
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
            </>
          )}

          <Accordion.Title
            active={activeIndex === 1}
            index={1}
            onClick={handleAccordionClick}
          >
            <Icon name="dropdown" />
            Filter Events
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <EventFilters loading={loading} />
          </Accordion.Content>
        </Accordion>
      </Grid.Column>

      <Grid.Column mobile={16} tablet={10} computer={10}>
        {loadingInitial ? (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        ) : (
          <>
            <EventList
              events={events}
              getNextEvents={handleFetchNextEvents}
              loading={loading}
              moreEvents={moreEvents}
            />
          </>
        )}
      </Grid.Column>

      <Grid.Column mobile={16} tablet={16} computer={16}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
