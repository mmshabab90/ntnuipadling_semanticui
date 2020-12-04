import React from "react";
import { Grid } from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreDoc from "./../../../app/hooks/useFirestoreDoc";
import { getUserProfile } from "./../../../app/api/firestore/firestoreService";
import { listenToSelectedUserProfile } from "./../profileStores/profileActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserProfile, currentUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  let profile;

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
    shouldExecute: match.params.id !== currentUser.uid,
  });

  if (match.params.id === currentUser.uid) {
    profile = currentUserProfile;
  } else {
    profile = selectedUserProfile;
  }

  if ((loading && !profile) || (!profile && !error))
    return <LoadingComponent content="Fetching user profile data..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser.uid === profile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
