import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

export default function InfoListPlaceholder() {
  return (
    <Card>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>

      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length="short" />
          </Placeholder.Header>
        </Placeholder>
      </Card.Content>

      <Card.Content extra>
        <Placeholder.Line length="very short" />
      </Card.Content>
    </Card>
  );
}
