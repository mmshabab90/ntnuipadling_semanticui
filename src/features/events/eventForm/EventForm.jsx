/* global google */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { createEvent, updateEvent } from "../eventsRedux/eventActions";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import cuid from "cuid";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateTimeInput from "../../../app/common/form/MyDateTimeInput";
import MyPlaceInput from "./../../../app/common/form/MyPlaceInput";

export default function EventForm({ match, history }) {
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();

  const initialValues = selectedEvent ?? {
    name: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    start_date_time: "",
    end_date_time: "",
    status: "true",
    total_participants: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Event Name is required"),
    // venue: Yup.object().shape({
    //   address: Yup.string().required("Venue address is required"),
    // }),
    status: Yup.bool().required(),
    // category: Yup.string().required(),
    start_date_time: Yup.date().required("Start Date and Time is required"),
    end_date_time: Yup.date().required("End Date and Time is required"),
    total_participants: Yup.number().required(
      "You must provide the total number of participants for the event"
    ),
  });

  const statusOptions = [
    { key: "active", text: "Active", value: "true" },
    { key: "inactive", text: "Inactive", value: "false" },
  ];

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
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
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Event Details' />

            <MyTextInput
              name='name'
              placeholder='Event Title'
              label='Event Title'
            />

            <MySelectInput
              name='category'
              placeholder='Category'
              label='Category'
              options={categoryData}
            />

            <MyTextArea
              name='description'
              placeholder='Description'
              label='Description'
              rows={3}
            />

            <MyTextInput
              name='total_participants'
              placeholder='Total Participants'
              label='Total Participants'
            />

            <MySelectInput
              name='status'
              placeholder='Status'
              label='Status'
              options={statusOptions}
            />

            <Header sub color='teal' content='Event Location Details' />

            <MyPlaceInput name='city' placeholder='City' />

            <MyPlaceInput
              name='venue'
              disabled={!values.city.latLng}
              placeholder='Venue'
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                type: ["establishment"],
              }}
            />

            <Header sub color='teal' content='Event Schedule' />

            <MyDateTimeInput
              name='start_date_time'
              placeholderText='Start Date Time'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <MyDateTimeInput
              name='end_date_time'
              placeholderText='End Date Time'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='Submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              type='Submit'
              floated='right'
              content='Cancel'
              as={Link}
              to='/events'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
