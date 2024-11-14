import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Content } from ".";

const mockData = {
  "TotalNumberOfResults": 100,
  "Page": 1,
  "PageSize": 10,
  "ResultItems": [{
    "DocumentId": "8f09d0d0898e5470189120415158f7b5",
    "DocumentTitle": {
      "Text": "Choose a Child Care Centre",
      "Highlights": [{
        "BeginOffset": 9,
        "EndOffset": 14
      }]
    },
    "DocumentExcerpt": {
      "Text": "...as partners to optimise the child physical, intellectual, emotional and social development. Choosing a Child Care Centre for Your Child In choosing the appropriate child care arrangement, the age and personality of your child are important factors for consideration...",
      "Highlights": [{
        "BeginOffset": 31,
        "EndOffset": 36
      },
      {
        "BeginOffset": 106,
        "EndOffset": 111
      },
      {
        "BeginOffset": 133,
        "EndOffset": 138
      },
      {
        "BeginOffset": 167,
        "EndOffset": 172
      },
      {
        "BeginOffset": 223,
        "EndOffset": 228
      }
      ]
    },
    "DocumentURI": "https://www.ecda.gov.sg/Parents/Pages/ParentsChooseCCC.aspx"
  }]
}

const mocks = vi.hoisted(() => {
  return {
    searchResult: vi.fn().mockReturnValue([])
  }
})

vi.mock('~/contexts/search-result.context', () => {
  return {
    useSearchResult: () => {
      return mocks.searchResult()
    }
  }
})

describe('Content Tests', () => {
  const setup = () => {
    render(<Content />)
  }

  it('should render nothing if there is no data', () => {
    setup()
    const contentItems = screen.queryAllByTestId('content-item')
    expect(contentItems).toHaveLength(0)
  })

  it('should render every contents if there is data', () => {
    mocks.searchResult.mockReturnValue(mockData)
    setup()
    const contentItems = screen.queryAllByTestId('content-item')
    expect(contentItems).toHaveLength(mockData.ResultItems.length)
  })
})