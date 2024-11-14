import Head from "next/head";
import { Header } from "~/components/pages";
import { Content } from "~/components/pages/landing-page/content";
import { SearchResultProvider } from "~/contexts/search-result.context";

export default function Home() {
  return (
    <>
      <Head>
        <title>Search Site</title>
      </Head>
      <SearchResultProvider>
        <Header/>
        <Content/>
      </SearchResultProvider>
    </>
  );
}

