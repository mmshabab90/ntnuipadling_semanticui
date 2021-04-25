import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Dropdown, Grid, Header } from "semantic-ui-react";

const options = [
  { key: 1, text: "", value: "" },
  { key: 2, text: "General", value: "General" },
  { key: 3, text: "Activity", value: "Activity" },
];

export default function InformationDashboard() {
  const [title, setTitle] = useState("");
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);

  const handleFilter = (e, { value }) => {
    setTitle(value);
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10} floated="left">
          <Grid verticalAlign="middle" divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header size="large" style={{ marginRight: 20 }}>
                  {`${title} Information` || "Information"}
                </Header>
              </Grid.Column>
              <Grid.Column>
                {authenticated && currentUserProfile?.admin && (
                  <Button
                    as={Link}
                    to="/createInfo"
                    positive
                    inverted
                    content="Add Info"
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>

        <Grid.Column width={6} floated="right">
          <Dropdown
            clearable
            options={options}
            selection
            name="filterInfo"
            onChange={handleFilter}
            value={title}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
