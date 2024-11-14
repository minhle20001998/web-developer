import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Autocomplete } from './index';

describe('Autocomplete Component', () => {
  const mockOnChange = vi.fn();
  const mockOnListItemPress = vi.fn();
  const mockRenderListItem = (item: string) => <div>{item}</div>;

  const defaultProps = {
    inputRef: undefined,
    value: '',
    listItems: ['apple', 'banana', 'cherry'],
    renderListItem: mockRenderListItem,
    onChange: mockOnChange,
    onListItemPress: mockOnListItemPress,
    showSuggestion: true,
  };

  const setup = () => {
    render(<Autocomplete {...defaultProps} />);
  }

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should renders without crashing', () => {
    setup()
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should opens popover on focus and closes on blur', async () => {
    setup()
    const input = screen.getByRole('textbox');

    // Focus the input to open the suggestion popover
    fireEvent.focus(input);
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Blur the input to close the popover with a timeout
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByRole('list')).not.toBeInTheDocument());
  });

  it('should calls onChange when input changes', () => {
    setup()
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything());
  });

  it('should navigates through list with arrow keys', () => {
    setup()
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('selected');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getAllByRole('listitem')[1]).toHaveClass('selected');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('selected');
  });

  it('should calls onListItemPress when Enter is pressed on an item', () => {
    setup()
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockOnListItemPress).toHaveBeenCalledWith('apple');
  });

  it('should closes popover when clicking outside', async () => {
    setup()
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);

    // Expect the list to be visible
    expect(screen.getByRole('list')).toBeInTheDocument();

    // Click outside
    fireEvent.blur(input);
    await waitFor(() => expect(screen.queryByRole('list')).not.toBeInTheDocument());
  });
});