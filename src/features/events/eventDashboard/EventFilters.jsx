import React from "react";
import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setStartDateTime } from "../eventsRedux/eventActions";

export default function EventFilters({ loading }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { filter, startDateTime } = useSelector((state) => state.event);

  return (
    <>
      {authenticated && (
        <Menu vertical size="large" style={{ width: "100%" }}>
          <Header icon="filter" attached color="teal" content="Filters" />

          <Menu.Item
            content="All Events"
            active={filter === "all"}
            onClick={() => dispatch(setFilter("all"))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm going"
            active={filter === "isGoing"}
            onClick={() => dispatch(setFilter("isGoing"))}
            disabled={loading}
          />
          <Menu.Item
            content="I'm hosting"
            active={filter === "isHost"}
            onClick={() => dispatch(setFilter("isHost"))}
            disabled={loading}
          />
        </Menu>
      )}

      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar
        onChange={(date) => dispatch(setStartDateTime(date))}
        value={startDateTime || new Date()}
        tileDisabled={() => loading}
      />
    </>
  );
}
