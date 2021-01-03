import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";

export default function About() {
  return (
    <Container>
      <Segment.Group raised>
        <Header
          as="h2"
          textAlign="center"
          content="Important pages"
          style={{ marginTop: 15 }}
        />
        <Segment>
          <Button basic content="Board Members" as={Link} to="/board-members" />
        </Segment>
        <Segment>
          <Button
            basic
            content="General information for all"
            as={Link}
            to="/general-info"
          />
        </Segment>
        <Segment></Segment>
      </Segment.Group>

      <Segment.Group>
        <Header
          as="h2"
          textAlign="center"
          content="Follow us at"
          style={{ marginTop: 15 }}
        />
        <Segment placeholder>
          <Grid stackable columns={2} textAlign="center">
            {/* <Divider vertical></Divider> */}

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="facebook official" color="blue" />
                </Header>
                <Button
                  as="a"
                  basic
                  className="link"
                  color="blue"
                  href="https://www.facebook.com/groups/ntnuipadling/"
                  content="Visit Page"
                />
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="instagram" color="orange" />
                </Header>
                <Button
                  as="a"
                  basic
                  className="link"
                  color="orange"
                  href="https://www.instagram.com/ntnuipadling/?hl=en"
                  content="Visit Page"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
    </Container>
  );
}
