import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Modal } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";

export default function UnauthModal({ history, setModalOpen }) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { prevLocation } = useSelector((state) => state.auth);

  function handleClose() {
    // on button, no history is generated
    // handles join event button for unauthenticated user
    // and exits out of the function
    if (!history) {
      setOpen(false);
      setModalOpen(false);
      return;
    }
    // if user comes from a location and modal is displayed, history is used
    if (history && prevLocation) {
      history.push(prevLocation.pathname);
    } else {
      history.push("/events");
    }
    setOpen(false);
  }

  function handleOpenLoginModal(modalType) {
    dispatch(openModal({ modalType }));
    setOpen(false);
    if (setModalOpen !== undefined) {
      setModalOpen(false);
    }
  }

  return (
    <Modal open={open} size="mini" onClose={handleClose}>
      <Modal.Header content="You need to be signed in to do that!" />
      <Modal.Content>
        <p>Please either login or register to see this content</p>
        <Button.Group widths={4}>
          <Button
            fluid
            color="teal"
            content="Login"
            onClick={() => handleOpenLoginModal("LoginForm")}
          />
          <Button.Or />
          <Button
            fluid
            color="green"
            content="Register"
            onClick={() => handleOpenLoginModal("RegisterForm")}
          />

          <Divider />
        </Button.Group>

        <div style={{ textAlign: "center" }}>
          <p>Oc click cancel to continue as a guest</p>
          <Button onClick={handleClose} color="grey" content="Cancel" />
        </div>
      </Modal.Content>
    </Modal>
  );
}
