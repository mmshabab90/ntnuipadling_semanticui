import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Container, Grid, Image, List } from "semantic-ui-react";
import {
  getMemberPhotos,
  listenToSelectedMemberFromFirestore,
} from "../../../app/api/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {
  deleteBoardMember,
  listenToBoardMemberPhotos,
  listenToSelectedBoardMember,
} from "../boardMembersRedux/boardMembersActions";
import BoardMemberPhotoWidget from "./BoardMemberPhotoWidget";
import ReactHtmlParser from "react-html-parser";

export default function BoardMemberDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { selectedMember, photos } = useSelector((state) => state.members);
  const { loading, error } = useSelector((state) => state.async);
  const [updateImage, setUpdateImage] = useState(false);

  useFirestoreDoc({
    query: () => listenToSelectedMemberFromFirestore(match.params.id),
    data: (member) => dispatch(listenToSelectedBoardMember(member)),
    deps: [match.params.id, dispatch],
  });

  useFirestoreCollection({
    query: () => getMemberPhotos(match.params.id),
    data: (photos) => dispatch(listenToBoardMemberPhotos(photos)),
    deps: [match.params.id, dispatch],
  });

  async function handleDelete() {
    const photo = photos[0];
    try {
      await dispatch(
        deleteBoardMember(selectedMember.id, photo?.name, photo?.id)
      );
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading || (!selectedMember && !error))
    return <LoadingComponent content="Loading Board Member..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Container>
      <Grid divided="vertically" stackable style={{ marginTop: 15 }}>
        <Grid.Column width={6}>
          <Image
            alt="member-img"
            src={selectedMember.photoURL || "/assets/user.png"}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{selectedMember.name}</Card.Header>

              <Card.Meta>{selectedMember.title}</Card.Meta>

              <Card.Description>
                <List divided relaxed>
                  <List.Item>
                    <List.Content>
                      <List.Header>Email</List.Header>
                      <List.Description>
                        {selectedMember.email}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>Description</List.Header>
                      <List.Description>
                        {ReactHtmlParser(selectedMember.description)}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>

            {selectedMember?.authorUid === currentUser?.uid && (
              <Card.Content extra>
                <Button
                  floated="right"
                  color="orange"
                  as={Link}
                  to={`/editBoardMember/${selectedMember.id}`}
                >
                  Edit
                </Button>
                <Button floated="right" color="red" onClick={handleDelete}>
                  Delete
                </Button>
                <Button
                  floated="left"
                  color={updateImage ? "grey" : "teal"}
                  onClick={() => setUpdateImage(!updateImage)}
                >
                  {updateImage ? "Cancel" : "Update Image"}
                </Button>
              </Card.Content>
            )}
          </Card>

          {updateImage && (
            <Card fluid>
              <BoardMemberPhotoWidget
                setEditMode={setUpdateImage}
                doc={selectedMember}
              />
            </Card>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
