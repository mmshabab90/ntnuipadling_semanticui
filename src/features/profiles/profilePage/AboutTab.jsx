import React from "react";
import { useState } from "react";
import { Grid, Header, Tab, Button } from "semantic-ui-react";
import { format } from "date-fns";
import ProfileForm from "./ProfileForm";

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated='right'
              basic
              content={editMode ? "Cancel" : "Edit"}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm
              profile={profile}
              closeFormOnUpdate={() => setEditMode(!editMode)}
            />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member since: {format(profile.createdAt, "dd-MM-yyyy")}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
