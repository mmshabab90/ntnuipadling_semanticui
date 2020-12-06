import React from "react";
import { Button, Placeholder, Segment } from "semantic-ui-react";

export default function NewsListItemPlaceholder() {
  return (
    <Placeholder fluid>
      <Segment.Group>
        <Segment style={{ minHeight: 110 }}>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Segment>

        <Segment clearing>
          <Button disabled color="blue" floated="right" content="View" />
        </Segment>
      </Segment.Group>
    </Placeholder>
  );
}
