import React from "react";
import { Grid } from "semantic-ui-react";
import MemberListItem from "./MemberListItem";

export default function MemberList({ members }) {
  return (
    <div>
      {members.length !== 0 && (
        <Grid stackable columns={4}>
          {members.map((member) => {
            return <MemberListItem key={member.id} memberItem={member} />;
          })}
        </Grid>
      )}
    </div>
  );
}
