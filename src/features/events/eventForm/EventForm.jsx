/* global google */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateTimeInput from "../../../app/common/form/MyDateTimeInput";
import MyPlaceInput from "./../../../app/common/form/MyPlaceInput";
import {
  addEventToFirestore,
  listenToEventFromFirestore,
} from "./../../../app/api/firestore/firestoreService";
import {
  clearSelectedEvent,
  listenToSelectedEvent,
} from "./../eventsRedux/eventActions";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "./../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { updateEventInFirestore } from "./../../../app/api/firestore/firestoreService";
import { cancelEventToggle } from "./../../../app/api/firestore/firestoreService";
import { useEffect } from "react";

export default function EventForm({ match, history, location }) {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { selectedEvent } = useSelector((state) => state.event);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== "/createEvent") return;

    dispatch(clearSelectedEvent());
  }, [dispatch, location.pathname]);

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
    total_participants: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Event Name is required"),
    start_date_time: Yup.date().required("Start Date and Time is required"),
    end_date_time: Yup.date().required("End Date and Time is required"),
    total_participants: Yup.number().required(
      "You must provide the total number of participants for the event"
    ),
  });

  async function handleCancelToggle(event) {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
      window.location.reload();
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedEvent?.id &&
      location.pathname !== "/createEvent",
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToSelectedEvent(event)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
            setSubmitting(false);
            history.push("/events");
            // window.location.reload(false);
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details" />

            <MyTextInput
              name="name"
              placeholder="Event Title"
              label="Event Title"
            />

            {/* <MySelectInput
              name="category"
              placeholder="Category"
              label="Category"
              options={categoryData}
            /> */}

            <MyTextArea
              name="description"
              placeholder="Description"
              label="Description"
              rows={3}
            />

            <MyTextInput
              name="total_participants"
              placeholder="Total Participants"
              label="Total Participants"
            />

            <Header sub color="teal" content="Event Location Details" />

            <MyPlaceInput name="city" placeholder="City" />

            <MyPlaceInput
              name="venue"
              disabled={!values.city.latLng}
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                type: ["establishment"],
              }}
            />

            <Header sub color="teal" content="Event Schedule" />

            <MyDateTimeInput
              name="start_date_time"
              placeholderText="Start Date Time"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              autoComplete="off"
            />

            <MyDateTimeInput
              name="end_date_time"
              placeholderText="End Date Time"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
              autoComplete="off"
            />

            {selectedEvent && (
              <>
                <Button
                  loading={loadingCancel}
                  type="button"
                  floated="left"
                  color={selectedEvent.status ? "green" : "orange"}
                  content={
                    selectedEvent.status
                      ? "Activate Event"
                      : "De-activate Event"
                  }
                  onClick={() => setConfirmOpen(true)}
                />
              </>
            )}
            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="Submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              type="Submit"
              floated="right"
              content="Cancel"
              as={Link}
              to="/events"
            />
          </Form>
        )}
      </Formik>
      <Confirm
        content={
          selectedEvent?.status
            ? "This will reactivate the event - are you sure?"
            : "This will de-activate the event - are you sure?"
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
}
