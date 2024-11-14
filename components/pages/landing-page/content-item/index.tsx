import { PropsWithChildren } from 'react'
import styles from './content-item.module.css'
import { DocumentExcerpt, SearchData } from '~/types'

export const ContentItem = ({ DocumentExcerpt, DocumentTitle, DocumentURI }: PropsWithChildren<SearchData>) => {

  // Render text with highlight keywords base on given array of highlight offsets
  const renderTextWithHighlights = ({ Text, Highlights }: DocumentExcerpt) => {
    // Initialize an empty array to hold the resulting JSX elements (text parts and highlights)
    const result = [];
    // Track the end of the last processed highlight to handle the remaining text
    let lastIndex = 0;

    Highlights.forEach(({ BeginOffset, EndOffset }, index) => {
      // If there is unhighlighted text before the current highlight -> add it as a <span>
      if (BeginOffset > lastIndex) {
        result.push(<span key={`text-${index}`}>{Text.slice(lastIndex, BeginOffset)}</span>);
      }

      // Add the highlighted text as a <b> element with a special "highlighted" style
      result.push(<b className={styles.highlighted} key={`highlight-${index}`}>{Text.slice(BeginOffset, EndOffset)}</b>);

      // Update lastIndex to the end of the current highlight
      lastIndex = EndOffset;
    });

    // If any remaining text after the last highlight, add it as a <span>
    if (lastIndex < Text.length) {
      result.push(<span key="remaining-text">{Text.slice(lastIndex)}</span>);
    }

    return result;
  };

  return <div className={styles['content-item-wrapper']}>
    <a className={styles['title-link']} href={DocumentURI}>{DocumentTitle?.Text ?? ''}</a>
    <p className={styles.excerpt}>{renderTextWithHighlights(DocumentExcerpt)}</p>
    <a className={styles.link} href={DocumentURI}>{DocumentURI ?? ""}</a>
  </div>
}