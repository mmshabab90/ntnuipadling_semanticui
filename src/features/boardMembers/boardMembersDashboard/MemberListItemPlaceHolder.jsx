import React from "react";
import { Card, Placeholder } from "semantic-ui-react";

export default function MemberListItemPlaceHolder() {
  return (
    <Card>
      <Placeholder>
        <Placeholder.Image square />
      </Placeholder>

      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length="very short" />
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder.Header>
        </Placeholder>
      </Card.Content>

      <Card.Content extra>
        <Placeholder.Line length="short" />
      </Card.Content>
    </Card>
  );
}
