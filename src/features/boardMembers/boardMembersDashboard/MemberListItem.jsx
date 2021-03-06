import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";

export default function MemberListItem({ memberItem }) {
  return (
    <Grid.Column>
      <Card>
        <Image
          alt="member-img"
          src={memberItem.photoURL || "/assets/user.png"}
        />
        <Card.Content>
          <Card.Header>{memberItem.name}</Card.Header>
          <Card.Meta>{memberItem.email}</Card.Meta>
          <Card.Description>{memberItem.title}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            color="blue"
            floated="right"
            content="View"
            as={Link}
            to={`/board-members/${memberItem.id}`}
          />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
