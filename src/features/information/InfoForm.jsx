import React, { useEffect, useState } from "react";
import CKEditor from "ckeditor4-react";
import * as Yup from "yup";
import { Button, FormField, Segment } from "semantic-ui-react";
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedInfo, listenToInfo } from "./infoRedux/infoActions";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import {
  addInformationToFirestore,
  listenToSelectedInfoFromFirestore,
  updateInformationInFirestore,
} from "../../app/api/firestore/firestoreService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router";
import MySelectInput from "../../app/common/form/MySelectInput";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const options = [
  { key: 1, text: "General", value: "General" },
  { key: 2, text: "Activity", value: "Activity" },
];

export default function InfoForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedInfo } = useSelector((state) => state.info);
  const { loading, error } = useSelector((state) => state.async);
  const [description, setDescription] = useState(
    location.pathname === "/createInfo" ? "" : selectedInfo?.description
  );

  useEffect(() => {
    if (location.pathname !== "/createInfo") return;

    dispatch(clearSelectedInfo());
  }, [dispatch, location.pathname]);

  const initialValues = selectedInfo ?? {
    description: "",
    type: "",
    title: "",
    photoURL: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    type: Yup.string().required("Type is required"),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedInfo?.id &&
      location.pathname !== "/createInfo",
    query: () => listenToSelectedInfoFromFirestore(match.params.id),
    data: (info) => dispatch(listenToInfo(info)),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content="Loading Information Form ..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          values.description = description;
          try {
            selectedInfo
              ? await updateInformationInFirestore(values)
              : await addInformationToFirestore(values);
            setSubmitting(false);
            history.push("/general-info");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="ui form">
            <MyTextInput
              name="title"
              placeholder="Title (required)"
              label="Title"
            />

            <MySelectInput
              name="type"
              placeholder="Information Type (required)"
              options={options}
            />

            <FormField style={{ marginBottom: 15 }}>
              <label>Description</label>
              <CKEditor
                name="description"
                placeholder="Description (optional)"
                data={description}
                onChange={(e) => {
                  const data = e.editor.getData();
                  setDescription(data);
                }}
              />
            </FormField>

            <Button
              loading={isSubmitting}
              disabled={!isValid || isSubmitting}
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
              to="/general-info"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
