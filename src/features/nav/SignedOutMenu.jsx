import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/common/modals/modalReducer";

export default function SignedOutMenu({ setAuthenticated }) {
  const dispatch = useDispatch();
  return (
    <Menu.Item position='right'>
      <Button
        basic
        inverted
        content='Login'
        onClick={() => dispatch(openModal({ modalType: "LoginForm" }))}
      />
      <Button
        basic
        inverted
        content='Register'
        onClick={() => dispatch(openModal({ modalType: "RegisterForm" }))}
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
}
