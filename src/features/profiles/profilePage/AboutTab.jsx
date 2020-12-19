import React from "react";
import { useState } from "react";
import { Grid, Header, Tab, Button } from "semantic-ui-react";
import { format } from "date-fns";
import ProfileForm from "./ProfileForm";
// import { useSelector } from "react-redux";
// import firebase from "../../../app/api/config/firebase";

export default function AboutTab({ profile, isCurrentUser }) {
  const [editMode, setEditMode] = useState(false);
  // const { currentUser } = useSelector((state) => state.auth);

  // function setAdmin() {
  //   // const userEmail = currentUser.email;
  //   console.log("Set user as admin");
  // }

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />

          {isCurrentUser && (
            <Button.Group floated="right">
              {/* <Button
                floated="right"
                basic
                content="Make Admin"
                onClick={setAdmin}
              /> */}

              <Button
                onClick={() => setEditMode(!editMode)}
                floated="right"
                basic
                color="teal"
                content={editMode ? "Cancel" : "Edit"}
              />
            </Button.Group>
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
