import { format } from "date-fns";
import React from "react";
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import ReactHtmlParser from "react-html-parser";

export default function NewsDetailedInfo({ news }) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Icon size="large" color="teal" name="info" />
            </Grid.Column>
            <Grid.Column width={4}>
              <Header content="Description" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Segment basic padded>
              {ReactHtmlParser(news.description)}
            </Segment>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={8}>
            <span> Published Date: {format(news.date, "MM-dd-yyyy")}</span>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon name="clock" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={5}>
            <span> Published Time: {format(news.date, "HH:mm")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
