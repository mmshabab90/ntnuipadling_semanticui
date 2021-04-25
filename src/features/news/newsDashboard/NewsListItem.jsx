import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

export default function NewsListItem({ newsItem }) {
  return (
    <Card.Group>
      <Card fluid>
        <Image
          wrapped
          ui={false}
          alt="News item image"
          src={newsItem.photoURL || "/assets/images/placeholder_news_img.jpg"}
          size="small"
        />
        <Card.Content>
          <Card.Header>{newsItem.title}</Card.Header>
          <Card.Meta>
            <b>Date: </b>
            {format(newsItem.date, "MMMM d, yyyy")}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button
            color="teal"
            floated="right"
            content="View"
            as={Link}
            to={`/news/${newsItem.id}`}
          />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
