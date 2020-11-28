import React from "react";
import { useSelector } from "react-redux";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign='center'
        content={error?.message || "Oops - Houston, we have a problem!!!"}
      />
      <Button
        as={Link}
        to='/events'
        primary
        style={{ marginTop: 20 }}
        content='Return to events page'
      />
    </Segment>
  );
}
