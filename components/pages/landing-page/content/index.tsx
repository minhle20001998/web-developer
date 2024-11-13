import { Container } from "~/components/ui";
import styles from "./content.module.css";
import { ContentItem } from "../content-item";
import { useSearchResult } from "~/contexts/search-result.context";
export const Content = () => {

  const { ResultItems, PageSize, Page, TotalNumberOfResults } = useSearchResult()

  return (
    <div className={styles['content-container']}>
      <Container style={{ paddingTop: 0 }}>
        <p className={styles.summary}>Showing {Page}-{PageSize} of {TotalNumberOfResults} results</p>
        <div className={styles['content-items-container']}>
          {ResultItems.map((item) => {
            return <ContentItem key={item.DocumentId} {...item} />
          })}
        </div>
      </Container>
    </div>
  );
};
