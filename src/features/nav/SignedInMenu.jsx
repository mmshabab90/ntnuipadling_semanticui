import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOutFirebase } from "../../app/api/firestore/firebaseService";

export default function SignedInMenu() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();

  async function handleSignOut() {
    try {
      history.push("/");
      await signOutFirebase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUserProfile.photoUrl || "/assets/user.png"}
      />
      <Dropdown pointing='top left' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createEvent'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item
            as={Link}
            to={`/profile/${currentUserProfile.id}`}
            text='My Profile'
            icon='user'
          />
          <Dropdown.Item
            as={Link}
            to='/account'
            text='My Account'
            icon='settings'
          />
          <Dropdown.Item text='Sign Out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
