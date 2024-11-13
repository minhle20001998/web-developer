
export interface SearchResult {
  TotalNumberOfResults: number
  Page: number
  PageSize: number
  ResultItems: SearchData[]
}

export interface SearchData {
  DocumentId: string
  DocumentTitle: DocumentTitle
  DocumentExcerpt: DocumentExcerpt
  DocumentURI: string
}

export interface DocumentTitle {
  Text: string
  Highlights: Highlight[]
}

export interface Highlight {
  BeginOffset: number
  EndOffset: number
}

export interface DocumentExcerpt {
  Text: string
  Highlights: Highlight2[]
}

export interface Highlight2 {
  BeginOffset: number
  EndOffset: number
}