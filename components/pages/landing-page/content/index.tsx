import { Container } from "~/components/ui";
import styles from "./content.module.css";
import { ContentItem } from "../content-item";
import { useSearchResult } from "~/contexts/search-result.context";
export const Content = () => {

  const searchResult = useSearchResult()

  return (
    <div className={styles['content-container']}>
      <Container style={{ paddingTop: 0 }}>
        {searchResult
          ? <p className={styles.summary}>Showing {searchResult?.Page}-{searchResult?.PageSize} of {searchResult?.TotalNumberOfResults} results</p>
          : <></>
        }
        <div className={styles['content-items-container']}>
          {searchResult?.ResultItems?.map((item) => {
            return <ContentItem key={item.DocumentId} {...item} />
          })}
        </div>
      </Container>
    </div>
  );
};
