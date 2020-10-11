import React from "react";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";

export default function EventDetailedInfo({ event }) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={14}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={6}>
            <span>
              {event.start_date === event.end_date
                ? event.start_date
                : `${event.start_date} to ${event.end_date}`}
            </span>
          </Grid.Column>
          <Grid.Column width={1}>
            <Icon name="clock" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={6}>
            <span>
              {event.start_time} to {event.end_time}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={5}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={5}>
            <Button color="teal" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
