import { PropsWithChildren } from 'react'
import styles from './content-item.module.css'
import { SearchData } from '~/types'

export const ContentItem = ({DocumentExcerpt,DocumentTitle,DocumentURI}: PropsWithChildren<SearchData>) => {
  return <div className={styles['content-item-wrapper']}>
    <a className={styles['title-link']} href={DocumentURI}>{DocumentTitle?.Text ?? ''}</a>
    <p className={styles.excerpt}>{DocumentExcerpt?.Text ?? ""}</p>
    <a className={styles.link} href={DocumentURI}>{DocumentURI ?? ""}</a>
  </div>
}