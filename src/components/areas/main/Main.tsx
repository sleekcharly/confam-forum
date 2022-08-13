import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { useParams, useHistory } from "react-router-dom";
import ThreadCard from "./ThreadCard";
import Category from "../../../models/Category";
import { gql, useLazyQuery } from "@apollo/client";

// get threads by Category id query
const GetThreadsByCategoryId = gql`
  query getThreadsByCategoryId($categoryId: ID!) {
    getThreadsByCategoryId(categoryId: $categoryId) {
      ... on EntityResult {
        messages
      }

      ... on ThreadArray {
        threads {
          id
          title
          body
          views
          points
          user {
            userName
          }
          threadItems {
            id
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`;

// get latest Threads query
const GetThreadsLatest = gql`
  query getThreadsLatest {
    getThreadsLatest {
      ... on EntityResult {
        messages
      }

      ... on ThreadArray {
        threads {
          id
          title
          body
          views
          points
          user {
            userName
          }
          threadItems {
            id
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`;
// define Main component
/*The two hooks defined below are lazy GraphQL queries, which means 
   they do not run immediately, unlike useQuery and only run when the
   execGetThreadsByCat or execGetThreadsLatest calls are made. The data property
   is what contains the query's return data */
const Main = () => {
  const [
    execGetThreadsByCat,
    {
      //error: threadsByCatErr,
      //called: threadsByCatCalled,
      data: threadsByCatData,
    },
  ] = useLazyQuery(GetThreadsByCategoryId);

  const [
    execGetThreadsLatest,
    {
      //error: threadsLatestErr,
      //called: threadsLatestCalled,
      data: threadsLatestData,
    },
  ] = useLazyQuery(GetThreadsLatest);

  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState<Category | undefined>();
  const [threadCards, setThreadCards] = useState<Array<JSX.Element> | null>(
    null
  );

  useEffect(() => {
    if (categoryId && Number(categoryId) > 0) {
      execGetThreadsByCat({
        variables: {
          categoryId,
        },
      });
    } else {
      execGetThreadsLatest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  /*In useEffect , threadsByCatData changes cause us to update category and
    threadCards with data from the getThreadsByCategoryId query.*/
  useEffect(() => {
    console.log("main threadsByCatData", threadsByCatData);
    if (
      threadsByCatData &&
      threadsByCatData.getThreadsByCategoryId &&
      threadsByCatData.getThreadsByCategoryId.threads
    ) {
      const threads = threadsByCatData.getThreadsByCategoryId.threads;
      const cards = threads.map((th: any) => {
        return <ThreadCard key={`thread-${th.id}`} thread={th} />;
      });
      setCategory(threads[0].category);
      setThreadCards(cards);
    }
  }, [threadsByCatData]);

  /*
    In useEffect , threadsLatestData changes cause us to update category
    and threadCards with data from the getThreadsLatest query. Notice
    when no categoryId is given, we just use a generic "Latest" name for our
    ThreadCategory.
    */
  useEffect(() => {
    if (
      threadsLatestData &&
      threadsLatestData.getThreadsLatest &&
      threadsLatestData.getThreadsLatest.threads
    ) {
      const threads = threadsLatestData.getThreadsLatest.threads;
      const cards = threads.map((th: any) => {
        return <ThreadCard key={`thread-${th.id}`} thread={th} />;
      });
      setCategory(new Category("0", "Latest"));
      setThreadCards(cards);
    }
  }, [threadsLatestData]);

  return (
    <main className="content">
      <MainHeader category={category} />
      <div>{threadCards}</div>
    </main>
  );
};

export default Main;
