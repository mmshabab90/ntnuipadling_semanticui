import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Accordion, Grid, Icon, Loader } from "semantic-ui-react";
import EventList from "./EventList";
import { clearEvents, fetchEvents } from "../eventsRedux/eventActions";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import EventsFeed from "./EventsFeed";
import { useEffect } from "react";
// import { RETAIN_STATE } from "../eventsRedux/eventConstants";
import LoadingComponent from "../../../app/layout/LoadingComponent";

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
      // dispatch({ type: RETAIN_STATE });
      dispatch(clearEvents())
    };
  }, [dispatch, filter, startDateTime, retainState]);

  // handle next batch of events
  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDateTime, limit, lastVisible));
  }

  if (events && events.length < 0)
    return <LoadingComponent content="Loading data..." />;

  return (
    <Grid stackable>
      <Grid.Column width={10}>
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

      <Grid.Column width={6}>
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

      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}
