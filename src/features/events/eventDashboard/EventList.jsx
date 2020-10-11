import React from "react";
import EventListItem from "./EventListItem";

export default function EventList({ events }) {
  return (
    <div>
      {events && events.length > 0 ? (
        events.map((event) => {
          return <EventListItem key={event.id} event={event} />;
        })
      ) : (
        <p color="red">No available data!</p>
      )}
    </div>
  );
}
