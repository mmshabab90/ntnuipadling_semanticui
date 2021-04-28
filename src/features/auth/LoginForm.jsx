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
import { toast } from "react-toastify";

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
            // password: Yup.string().required(),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              if (viewPasswordReset) {
                setErrors({ auth: "" });
                await passwordReset(values.email).then(() => {
                  toast.success(
                    "Password Request email sent. Please check your email."
                  );
                });
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
              {passwordReset && !viewPasswordReset && (
                <MyTextInput
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              )}
              <p>
                <u>
                  <em
                    onClick={() => setViewPasswordReset(!viewPasswordReset)}
                    style={{ cursor: "pointer" }}
                  >
                    {!viewPasswordReset
                      ? "Forgot Password? Click here..."
                      : "Click here to go back to login form"}
                  </em>
                </u>
              </p>

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
                content={!viewPasswordReset ? "Login" : "Submit"}
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
