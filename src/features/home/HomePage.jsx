import React from "react";
import {
  Container,
  Header,
  Segment,
  Image,
  Button,
  Icon,
} from "semantic-ui-react";

export default function HomePage({ history }) {
  return (
    <Segment textAlign='center' vertical className='masthead' inverted>
      <Container>
        <Header as='h1' inverted>
          <Image
            item='massive'
            src='/assets/images/logo.png'
            alt='logo'
            style={{ marginBottom: 12, height: "10vh", width: "15vh" }}
          />
        </Header>

        <Button onClick={() => history.push("/events")} size='huge' inverted>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    </Segment>
  );
}
