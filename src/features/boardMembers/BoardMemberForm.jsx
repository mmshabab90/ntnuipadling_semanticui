import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import CKEditor from "ckeditor4-react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormField, Segment } from "semantic-ui-react";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import {
  clearSelectedBoardMember,
  listenToSelectedBoardMember,
} from "./boardMembersRedux/boardMembersActions";
import {
  addMemberToFirestore,
  listenToSelectedMemberFromFirestore,
  updateMemberInFirestore,
} from "../../app/api/firestore/firestoreService";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Redirect } from "react-router";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Link } from "react-router-dom";

export default function BoardMemberForm({ match, history, location }) {
  const dispatch = useDispatch();
  const { selectedMember } = useSelector((state) => state.members);
  const { loading, error } = useSelector((state) => state.async);
  const [description, setDescription] = useState(
    location.pathname === "/createBoardMember"
      ? ""
      : selectedMember?.description
  );

  useEffect(() => {
    if (location.pathname !== "/createBoardMember") return;

    dispatch(clearSelectedBoardMember());
  }, [dispatch, location.pathname]);

  const initialValues = selectedMember ?? {
    name: "",
    description: "",
    email: "",
    title: "",
    photoURL: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Member full name is required"),
    email: Yup.string().required("Member email is required"),
    title: Yup.string().required("Member title is required"),
  });

  useFirestoreDoc({
    shouldExecute:
      match.params.id !== selectedMember?.id &&
      location.pathname !== "/createBoardMember",
    query: () => listenToSelectedMemberFromFirestore(match.params.id),
    data: (member) => dispatch(listenToSelectedBoardMember(member)),
    deps: [match.params.id, dispatch],
  });

  if (loading)
    return <LoadingComponent content="Loading Board Member Form..." />;

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
            selectedMember
              ? await updateMemberInFirestore(values)
              : await addMemberToFirestore(values);
            setSubmitting(false);
            history.push("/board-members");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="ui form">
            <MyTextInput
              name="name"
              placeholder="Full Name (required)"
              label="Full Name"
            />

            <MyTextInput
              name="email"
              placeholder="Board Member Email Address (required)"
              label="Email"
              type="email"
            />

            <MyTextInput
              name="title"
              placeholder="Board Member Title (required)"
              label="Title"
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
              to="/board-members"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
