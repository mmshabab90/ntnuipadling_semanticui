import React from "react";
import { Container, Header, Image } from "semantic-ui-react";

export default function AppHeader({ mobile }) {
  return (
    <Container text>
      <Header
        as="h3"
        inverted
        textAlign="center"
        style={{
          fontSize: mobile ? "1em" : "1.3em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "0em" : "0em",
        }}
      >
        <Image
          circular
          src="/assets/images/logo.png"
          style={{ marginTop: -5 }}
          size="massive"
        />
        NTNUI PADLING
      </Header>
    </Container>
  );
}
