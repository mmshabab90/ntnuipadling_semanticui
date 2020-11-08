import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../app/api/firestore/firestoreService";

export default function ProfileForm({ profile, closeFormOnUpdate }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateUserProfile(values);
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeFormOnUpdate();
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextArea name='description' placeholder='User Description' />
          <Button
            floated='right'
            type='submit'
            size='large'
            positive
            content='Update profile'
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
}
