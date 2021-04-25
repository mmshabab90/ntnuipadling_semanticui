import React from "react";
import { Grid } from "semantic-ui-react";
import InfoListItem from "./InfoListItem";

export default function InfoList({ infos, selection }) {
  return (
    <div>
      {infos.length !== 0 && (
        <Grid stackable columns={4}>
          {selection
            ? infos
                .filter((i) => i?.type === selection)
                .map((info) => {
                  return <InfoListItem key={info.id} infoItem={info} />;
                })
            : infos && infos.map((info) => {
                return <InfoListItem key={info.id} infoItem={info} />;
              })}
        </Grid>
      )}
    </div>
  );
}
