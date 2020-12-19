import React from "react";
import { useEffect } from "react";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Segment, Button } from "semantic-ui-react";
import {
  clearSelectedNews,
  listenToSelectedNews,
} from "./newsRedux/newsActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import {
  addNewsToFirestore,
  listenToNewsFromFirestore,
  updateNewsInFirestore,
} from "../../app/api/firestore/firestoreService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

export default function NewsForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedNews } = useSelector((state) => state.news);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    if (location.pathname !== "/createNews") return;

    dispatch(clearSelectedNews());
  }, [dispatch, location.pathname]);

  const initialValues = selectedNews ?? {
    title: "",
    photoURL: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("News Title/Name is required"),
  });

  useFirestoreDoc({
    shouldExecute:
      match.paramsid !== selectedNews?.id && location.pathname !== "createNews",
    query: () => listenToNewsFromFirestore(match.params.id),
    data: (news) => dispatch(listenToSelectedNews(news)),
    deps: [match.params.id, dispatch],
  });

  if (loading) return <LoadingComponent content="Loading data..." />;

  if (error) return <Redirect to="error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedNews
              ? await updateNewsInFirestore(values)
              : await addNewsToFirestore(values);
            setSubmitting(false);
            history.push("/");
            // window.location.reload(false);
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="News Details" />

            <MyTextInput
              name="title"
              placeholder="News Title (required)"
              label="News Title"
            />

            <MyTextArea
              name="description"
              placeholder="Description (optional)"
              label="Description"
              rows={10}
            />

            {/* <MyTextInput
              name="photoURL"
              placeholder="Enter/Paste the url of the photo linked to the news (optional)"
              label="Image Link"
            /> */}

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
              to="/"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
