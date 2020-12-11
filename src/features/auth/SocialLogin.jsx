import React from "react";
import { Button, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/api/firestore/firebaseService";

export default function SocialLogin() {
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }
  return (
    <>
      <Button
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Login with Facebook"
        onClick={() => handleSocialLogin("facebook")}
      />

      <Divider horizontal>OR</Divider>

      <Button
        icon="google"
        fluid
        color="google plus"
        content="Login with Google"
        onClick={() => handleSocialLogin("google")}
      />
    </>
  );
}
