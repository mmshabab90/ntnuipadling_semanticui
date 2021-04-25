import React from "react";
import EventListItem from "./EventListItem";
import InfiniteScroll from "react-infinite-scroller";

export default function EventList({
  events,
  getNextEvents,
  loading,
  moreEvents,
}) {
  return (
    <div>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events
            .sort((a, b) => (a.start_date_time > b.start_date_time ? -1 : 1))
            .map((event) => {
              return <EventListItem key={event.id} event={event} />;
            })}
        </InfiniteScroll>
      )}
    </div>
  );
}
