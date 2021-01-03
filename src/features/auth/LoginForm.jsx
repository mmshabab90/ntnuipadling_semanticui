import { Form, Formik } from "formik";
import React from "react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Divider, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import {
  passwordReset,
  signInWithEmail,
} from "./../../app/api/firestore/firebaseService";
import SocialLogin from "./SocialLogin";
import { useState } from "react";

export default function LoginForm() {
  const dispatch = useDispatch();
  const [viewSocial, setViewSocial] = useState(false);
  const [viewPasswordReset, setViewPasswordReset] = useState(false);

  return (
    <ModalWrapper size="mini" header="Sign in to NTNUI-PADLING">
      {!viewSocial ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              if (viewPasswordReset) {
                await passwordReset(values);
                setSubmitting(false);
              } else {
                await signInWithEmail(values);
                setSubmitting(false);
                dispatch(closeModal());
              }
            } catch (error) {
              setErrors({ auth: "Wrong Email / Password" });
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty, errors }) => (
            <Form className="ui form">
              <MyTextInput name="email" placeholder="Email Address" />
              {passwordReset && (
                <MyTextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              )}
              {/* <p>
                <em
                  onClick={() => setViewPasswordReset(true)}
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password? Click here...
                </em>
              </p> */}

              {errors.auth && (
                <Label
                  basic
                  color="red"
                  style={{ marginBottom: 10 }}
                  content={errors.auth}
                />
              )}

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                fluid
                color="teal"
                content="Login"
              />

              <Divider horizontal>OR</Divider>

              <Button
                fluid
                content="Social Login"
                color="blue"
                onClick={() => setViewSocial(true)}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <SocialLogin setViewSocial={setViewSocial} />
      )}
    </ModalWrapper>
  );
}
