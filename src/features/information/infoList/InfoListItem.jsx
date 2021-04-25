import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";

export default function InfoListItem({ infoItem }) {
  return (
    <Grid.Column>
      <Card>
        <Image
          wrapped
          ui={false}
          alt="info-img"
          src={infoItem.photoURL || "/assets/logo.png"}
        />

        <Card.Content>
          <Card.Header> {infoItem.title} </Card.Header>
          <Card.Meta> Information Type: {infoItem.type}</Card.Meta>
        </Card.Content>

        <Card.Content extra>
          <Button
            color="blue"
            floated="right"
            content="View"
            as={Link}
            to={`/general-info/${infoItem.id}`}
          />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
