import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import { getBoardMembersFromFirestore } from "../../../app/api/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToBoardMembers } from "../boardMembersRedux/boardMembersActions";
import MemberList from "./MemberList";
import MemberListItemPlaceHolder from "./MemberListItemPlaceHolder";

export default function BoardMembersDashboard() {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getBoardMembersFromFirestore(),
    data: (members) => dispatch(listenToBoardMembers(members)),
    deps: [dispatch],
  });

  if (members && members.length < 0)
    return <LoadingComponent content="Loading data..." />;

  return (
    <Container>
      <Grid stackable columns={2}>
        <Grid.Column>
          <Header as="h1">Board Members</Header>
        </Grid.Column>
        <Grid.Column>
          <Button
            color="green"
            floated="right"
            as={Link}
            to="/createBoardMember"
          >
            Add Board Member
          </Button>
        </Grid.Column>
      </Grid>

      {loading ? (
        <Grid stackable columns={4}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Grid.Column key={i}>
              <MemberListItemPlaceHolder />
            </Grid.Column>
          ))}
        </Grid>
      ) : members && members.length > 0 ? (
        <MemberList members={members} />
      ) : (
        <Grid centered>
          <Grid.Row>
            <Segment placeholder>
              <Header icon>
                <Icon name="info">
                  Nothing to show here yet! Add item to populate the view.
                </Icon>
              </Header>
            </Segment>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
}
