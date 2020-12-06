import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { listenToNewsFromFirestore } from "../../../app/api/firestore/firestoreService";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToSelectedNews } from "../newsRedux/newsActions";
import NewsDetailedHeader from "./NewsDetailedHeader";
import NewsDetailedInfo from "./NewsDetailedInfo";
import NewsDetailedSidebar from "./NewsDetailedSidebar";

export default function NewsDetailedPage({ match }) {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.selectedNews);
  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToNewsFromFirestore(match.params.id),
    data: (newsItem) => dispatch(listenToSelectedNews(newsItem)),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!news && !error))
    return <LoadingComponent content="Loading data..." />;

  if (error) return <Redirect to="/error" />;

  return (
    <Grid stackable>
      <Grid.Column width={10}>
        <NewsDetailedHeader news={news} />
        <NewsDetailedInfo news={news} />
      </Grid.Column>

      <Grid.Column width={6}>
        <NewsDetailedSidebar
          author={news.author}
          authorUid={news.authorUid}
          authorPhotoURL={news.authorPhotoURL}
        />
      </Grid.Column>
    </Grid>
  );
}
