import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import NewsListItem from "./NewsListItem";
export default function NewsList({ news, getNextNews, loading, moreNews }) {
  return (
    <div>
      {news.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextNews}
          hasMore={!loading && moreNews}
          initialLoad={false}
        >
          {news.map((newsItem) => {
            return <NewsListItem key={newsItem.id} newsItem={newsItem} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}
