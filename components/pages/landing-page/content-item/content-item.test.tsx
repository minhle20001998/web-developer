import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContentItem } from './index';
import styles from './content-item.module.css';

describe('ContentItem Component', () => {
  const mockData = {
    DocumentId: '1',
    DocumentTitle: {
      Text: 'Sample Document Title',
      Highlights: [{ BeginOffset: 7, EndOffset: 15 }],
    },
    DocumentExcerpt: {
      Text: 'This is a sample excerpt text with highlights.',
      Highlights: [
        { BeginOffset: 10, EndOffset: 16 },
        { BeginOffset: 35, EndOffset: 45 },
      ],
    },
    DocumentURI: 'http://example.com/document',
  };

  const setup = () => {
    render(<ContentItem {...mockData} />);
  }

  it('should renders DocumentTitle text as a link', () => {
    setup()
    const titleLink = screen.getByRole('link', { name: /sample document title/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', mockData.DocumentURI);
  });

  it('should renders DocumentExcerpt with highlighted text', () => {
    setup()

    // Verify all unhighlighted and highlighted text parts are rendered correctly
    expect(screen.getByText('This is a')).toBeInTheDocument();
    expect(screen.getByText('excerpt text with')).toBeInTheDocument();

    // Verify each highlighted part separately, using its specific text
    const highlightedSample = screen.getByText('sample');
    expect(highlightedSample).toBeInTheDocument();
    expect(highlightedSample.tagName).toBe('B');
    expect(highlightedSample).toHaveClass(styles.highlighted);

    const highlightedHighlights = screen.getByText('highlights');
    expect(highlightedHighlights).toBeInTheDocument();
    expect(highlightedHighlights.tagName).toBe('B');
    expect(highlightedHighlights).toHaveClass(styles.highlighted);
  });

  it('should renders DocumentURI as a separate link', () => {
    setup()
    const uriLink = screen.getByText(mockData.DocumentURI);
    expect(uriLink).toBeInTheDocument();
    expect(uriLink).toHaveAttribute('href', mockData.DocumentURI);
  });
});