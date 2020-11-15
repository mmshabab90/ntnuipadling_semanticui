import React from "react";
import { useState } from "react";
import { Grid, Header, Tab, Card, Image, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "./../../../app/hooks/useFirestoreCollection";
import { getUserEventsQuery } from "./../../../app/api/firestore/firestoreService";
import { listenToUserEvents } from "../profileStores/profileActions";

export default function EventsTab({ profile }) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { profileEvents } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeTab, profile.id),
    data: (events) => dispatch(listenToUserEvents(events)),
    deps: [dispatch, activeTab, profile.id],
  });
  const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "past" } },
    { menuItem: "Hosting", pane: { key: "hosting" } },
  ];

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Events' />
        </Grid.Column>

        <Grid.Column width={16}>
          <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true, fluid: true }}
          />
          <Card.Group style={{ marginTop: 10 }} stackable itemsPerRow={3}>
            {profileEvents.map((event) => (
              <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                <Image
                  src={`/assets/categoryImages/${event.category}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />

                <Card.Content>
                  <Card.Header content={event.title} textAlign='center' />
                  <Card.Meta textAlign='center'>
                    <div>
                      <Icon name='calendar' style={{ marginRight: 5 }} />
                      {format(event.start_date_time, "dd MMM yyyy")}
                    </div>
                    <div>
                      <Icon name='clock' style={{ marginRight: 5 }} />
                      {format(event.start_date_time, "H:mm ")}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
