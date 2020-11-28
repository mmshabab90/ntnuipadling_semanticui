import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";

export default function ProfileCard({ profile }) {
  return (
    <Card as={Link} to={`/profile/${profile.id}`}>
      <Image
        src={profile.photoURL || "/assets/user.png"}
        style={{ width: "100%" }}
      />
      <Card.Content>
        <Card.Header content={profile.displayName} />
      </Card.Content>
    </Card>
  );
}
