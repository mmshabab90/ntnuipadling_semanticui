import cuid from "cuid";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventsRedux/eventActions";

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    name: "",
    catergory: "",
    description: "",
    city: "",
    venue: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    status: "",
    total_participants: "",
  };
  const [values, setValues] = useState(initialValues);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleFormSubmit() {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            attendees: [],
            hostPhotoURL:
              "https://picsum.photos/id/" +
              Math.floor(Math.random() * 50 + 1) +
              "/200/300",
          })
        );

    history.push("/events");
  }

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit the event" : "Create new event"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            name="name"
            placeholder="Event Title"
            value={values.name}
            onChange={(e) => handleInputChange(e)}
            required
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            name="catergory"
            placeholder="Catergory"
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={values.venue}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="date"
            name="start_date"
            placeholder="Start Date"
            value={values.start_date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="time"
            name="start_time"
            placeholder="Start Time"
            value={values.start_time}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="date"
            name="end_date"
            placeholder="End Date"
            value={values.end_date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="time"
            name="end_time"
            placeholder="End Time"
            value={values.end_time}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="number"
            name="total_participants"
            placeholder="Total Participants"
            value={values.total_participants}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Form.Field>
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={values.status}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>

        <Button type="Submit" floated="right" positive content="Submit" />
        <Button
          type="Submit"
          floated="right"
          content="Cancel"
          as={Link}
          to="/events"
        />
      </Form>
    </Segment>
  );
}
