import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const data = useSelector((state) => state.test.data); //read state value from redux
  const dispatch = useDispatch(); //change redux state using action/dispatch

  return (
    <>
      <h1>Testing 123...</h1>
      <h3>The data is: {data}</h3>
      <Button.Group>
        <Button onClick={() => dispatch(increment(20))}>Increment</Button>
        <Button.Or />
        <Button positive onClick={() => dispatch(decrement(10))}>
          Decrement
        </Button>
      </Button.Group>
      <br />
      <br />
      <Button
        content="Open Modal"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
      />

      <div style={{ marginTop: 15 }}>
        <TestPlaceInput />
      </div>
    </>
  );
}
