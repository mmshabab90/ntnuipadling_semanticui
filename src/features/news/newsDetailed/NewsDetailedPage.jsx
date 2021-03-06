import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  getNewsPhotos,
  listenToNewsFromFirestore,
} from "../../../app/api/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {
  listenToNewsPhotos,
  listenToSelectedNews,
} from "../newsRedux/newsActions";
import NewsDetailedHeader from "./NewsDetailedHeader";
import NewsDetailedInfo from "./NewsDetailedInfo";

export default function NewsDetailedPage({ match }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.selectedNews);
  const photos = useSelector((state) => state.news.photos);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToNewsFromFirestore(match.params.id),
    data: (newsItem) => dispatch(listenToSelectedNews(newsItem)),
    deps: [match.params.id, dispatch],
  });

  useFirestoreCollection({
    query: () => getNewsPhotos(match.params.id),
    data: (photos) => dispatch(listenToNewsPhotos(photos)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!news && !error))
    return <LoadingComponent content="Loading data..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid stackable>
      <Grid.Column>
        <NewsDetailedHeader news={news} photo={photos[0]} />
        <NewsDetailedInfo news={news} />
      </Grid.Column>
    </Grid>
  );
}
