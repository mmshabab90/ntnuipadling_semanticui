import React from "react";
import {
  Grid,
  Segment,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from "semantic-ui-react";

export default function ProfileHeader({ profile, isCurrentUser }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoUrl || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: "block", marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>

        <Grid.Column width={4}>
          <Statistic.Group style={{ marginBottom: 5 }}>
            <Statistic label='Followers' value={10} />
            <Statistic label='Following' value={5} />
          </Statistic.Group>

          {!isCurrentUser && (
            <>
              <Divider />

              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: "100%" }}>
                  <Button fluid color='teal' content='Following' />
                </Reveal.Content>

                <Reveal.Content hidden style={{ width: "100%" }}>
                  <Button fluid basic color='red' content='Unfollow' />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
