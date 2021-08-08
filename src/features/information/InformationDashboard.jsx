import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Dropdown,
  FormField,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { getInformationFromFirestore } from '../../app/api/firestore/firestoreService';
import useFirestoreCollection from '../../app/hooks/useFirestoreCollection';
import LoadingComponent from '../../app/layout/LoadingComponent';
import InfoList from './infoList/InfoList';
import InfoListPlaceholder from './infoList/InfoListPlaceholder';
import { listenToInformations } from './infoRedux/infoActions';

const options = [
  { key: 1, text: 'Select Filter' },
  { key: 2, text: 'General', value: 'General' },
  { key: 3, text: 'Activity', value: 'Activity' },
];

export default function InformationDashboard() {
  const dispatch = useDispatch();
  const { infos } = useSelector((state) => state.info);
  const { loading } = useSelector((state) => state.async);
  const [title, setTitle] = useState('');
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const [infoType, setInfoType] = useState('General');

  useFirestoreCollection({
    query: () => getInformationFromFirestore(),
    data: (info) => dispatch(listenToInformations(info)),
    deps: [dispatch],
  });

  const handleFilter = (e, { value }) => {
    setTitle(value);
  };

  function onGeneralClick() {
    setInfoType('General');
  }
  function onActivityClick() {
    setInfoType('Activity');
  }

  if (infos && infos.length < 0)
    return <LoadingComponent content="Loading data ..." />;

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={10} computer={10} floated="left">
            <Grid verticalAlign="middle" divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Header size="large" style={{ marginRight: 20 }}>
                    {`${infoType} Information` || 'Information'}
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

          <Grid.Column mobile={16} tablet={6} computer={6} floated="right">
            <FormField>
              <label style={{ marginRight: 5 }}>Select Info Type</label>
              {/* <Dropdown
                clearable
                options={options}
                selection
                name="filterInfo"
                onChange={handleFilter}
                value={title}
              /> */}
              <Button.Group>
                <Button size="large" onClick={onGeneralClick}>
                  General
                </Button>
                <Button.Or />
                <Button size="large" onClick={onActivityClick}>
                  Activity
                </Button>
              </Button.Group>
            </FormField>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {loading ? (
        <Grid stackable columns={4}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Grid.Column key={i}>
              <InfoListPlaceholder />
            </Grid.Column>
          ))}
        </Grid>
      ) : infos && infos.length > 0 ? (
        <InfoList infos={infos} selection={infoType} />
      ) : (
        <Grid centered>
          <Grid.Row>
            <Segment placeholder>
              <Header icon>
                <Icon name="info" />
                Nothing to show here yet! Add item to populate the view.
              </Header>
            </Segment>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
