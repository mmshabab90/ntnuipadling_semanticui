import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { deleteMemberInFirestore } from "../../../app/api/firestore/firestoreService";

export default function MemberListItem({ memberItem }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const isAuthor = memberItem?.authorUid === currentUser?.uid;

  function handleDelete() {
    try {
      dispatch(deleteMemberInFirestore(memberItem.id));
    } catch (error) {
      // toast.error(error.message);
    }
  }

  return (
    <Grid.Column>
      <Card>
        <Image
          alt="member-img"
          src={memberItem.photoURL || "/assets/user.png"}
        />
        <Card.Content>
          <Card.Header>{memberItem.name}</Card.Header>
          <Card.Meta>{memberItem.email}</Card.Meta>
          <Card.Description>{memberItem.title}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {isAuthor && currentUserProfile?.admin && (
            <Button
              icon="trash"
              floated="left"
              color="red"
              onClick={handleDelete}
            />
          )}
          <Button
            color="blue"
            floated="right"
            content="View"
            as={Link}
            to={`/board-members/${memberItem.id}`}
          />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
