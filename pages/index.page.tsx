import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { Header } from "~/components/pages";
import { Content } from "~/components/pages/landing-page/content";
import { httpClient } from "~/configs/axios";
import { mockSearchEndpoint } from "~/constants";
import { SearchResultProvider } from "~/contexts/search-result.context";
import { SearchResult } from "~/types";

export default function Home({
  searchResult,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>Search Site</title>
      </Head>
      <SearchResultProvider searchResult={searchResult}>
        <Header/>
        <Content/>
      </SearchResultProvider>
    </>
  );
}

export const getStaticProps = (async () => {
  const { data } = await httpClient.get<SearchResult>(`/${mockSearchEndpoint}`);
  return {
    props: {
      searchResult: data,
    },
  };
}) as GetStaticProps<{ searchResult: SearchResult }>;
