import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import {
  getInfoPhotos,
  listenToSelectedInfoFromFirestore,
} from "../../../app/api/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToInfo, listenToInfoPhotos } from "../infoRedux/infoActions";
import InfoDetailedBody from "./InfoDetailedBody";
import InfoDetailHeader from "./InfoDetailHeader";

export default function InfoDetailedPage({ match }) {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info.selectedInfo);
  const photos = useSelector((state) => state.info.photos);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToSelectedInfoFromFirestore(match.params.id),
    data: (newsItem) => dispatch(listenToInfo(newsItem)),
    deps: [match.params.id, dispatch],
  });

  useFirestoreCollection({
    query: () => getInfoPhotos(match.params.id),
    data: (photos) => dispatch(listenToInfoPhotos(photos)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!info && !error))
    return <LoadingComponent content="Loading data..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid stackable>
      <Grid.Column>
        <InfoDetailHeader info={info} photos={photos[0]} />
        <InfoDetailedBody info={info} />
      </Grid.Column>
    </Grid>
  );
}
