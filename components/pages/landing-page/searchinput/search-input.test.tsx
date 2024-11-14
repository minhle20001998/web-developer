import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchInput } from ".";

const routerPush = vi.fn()

const mocks = vi.hoisted(() => {
  return {
    suggestion: {
      "stemmedQueryTerm": "child",
      "suggestions": [
        "child care",
        "child vaccination",
        "child health",
        "child education",
        "child development account",
        "register childcare"
      ]
    },
    query: vi.fn().mockReturnValue({})
  }
})

vi.mock('~/hooks/fetch/use-fetch-suggestion.hook', () => {
  return {
    useFetchSuggestion: () => {
      return {
        data: mocks.suggestion
      }
    }
  }
})

vi.mock('next/router', () => ({
  useRouter: () => {
    return {
      route: '/',
      pathname: '',
      query: mocks.query(),
      asPath: '',
      push: routerPush,
      events: {
        on: vi.fn(),
        off: vi.fn()
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null)
    }
  }
}))

describe('Search Input Tests', () => {
  const setup = () => {
    render(<SearchInput />)
  }

  beforeEach(() => {
    mocks.query.mockReturnValue({})
  })

  afterEach(() => {
    routerPush.mockReset()
  })

  it('should input value change by search query', () => {
    const testValue = 'Test'
    mocks.query.mockReturnValue({ search: testValue })
    setup()

    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    expect(autocompleteInput).toHaveDisplayValue(testValue)
  })

  it('should input submit value when user hit enter', () => {
    setup()
    const testValue = 'Test'
    // Enter input value
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    fireEvent.input(autocompleteInput, { target: { value: testValue } });
    // Hit enter
    fireEvent.submit(autocompleteInput);
    // expect router query to be changed to a new search query
    expect(routerPush).toBeCalledWith({
      pathname: '/',
      search: `search=${testValue}`
    })
  })

  it('should input submit value when click search button', async () => {
    setup()
    const testValue = 'Test'
    // Enter input value
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    fireEvent.input(autocompleteInput, { target: { value: testValue } });
    // Click search button
    const searchButton = screen.getByTestId('search-button')
    await userEvent.click(searchButton)
    // expect router query to be changed to a new search query
    expect(routerPush).toBeCalledWith({
      pathname: '/',
      search: `search=${testValue}`
    })
  })

  it('should render suggestions correctly', () => {
    setup()
    const testValue = 'Test'
    // Enter valid input value to trigger popover
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    act(() => {
      autocompleteInput.focus()
      fireEvent.input(autocompleteInput, { target: { value: testValue } });
    })
    // Expect popover to be on screen
    const popover = screen.getByTestId('autocomplete-popover')
    expect(popover).toBeInTheDocument()
    // Expect all suggestion show up
    mocks.suggestion.suggestions.forEach((suggestion) => {
      expect(screen.getByTestId(`list-item-${suggestion}`)).toBeInTheDocument()
    })
  })

  it('should input change value when hit enter on suggestion', async () => {
    setup()
    const testValue = 'Test'
    // Enter valid input value to trigger popover
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    act(() => {
      autocompleteInput.focus()
      fireEvent.input(autocompleteInput, { target: { value: testValue } });
    })

    // Expect popover to be on screen
    const popover = screen.getByTestId('autocomplete-popover')
    expect(popover).toBeInTheDocument()
    // Select first option and hit enter
    fireEvent.keyDown(autocompleteInput, { key: 'ArrowDown', keyCode: 40 })
    fireEvent.keyDown(autocompleteInput, { key: 'Enter', keyCode: 13 })
    // Expect popover to be closed
    await waitFor(() => {
      expect(screen.queryByRole('list')).not.toBeInTheDocument();
      expect(popover).not.toBeInTheDocument()
    })
    // Expect input to have suggestion value
    expect(routerPush).toBeCalledWith({
      pathname: '/',
      search: new URLSearchParams({ search: mocks.suggestion.suggestions[0] }).toString()
    })
  })

  it('should input change value when click suggestion', async () => {
    setup()
    const testValue = 'Test'
    // Enter valid input value to trigger popover
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    expect(autocompleteInput).toBeInTheDocument()
    act(() => {
      autocompleteInput.focus()
      fireEvent.input(autocompleteInput, { target: { value: testValue } });
    })

    // Expect popover to be on screen
    const popover = screen.getByTestId('autocomplete-popover')
    expect(popover).toBeInTheDocument()
    // Select first option and click
    const firstOption = screen.getByTestId(`list-item-${mocks.suggestion.suggestions[0]}`)
    await userEvent.click(firstOption)
    // Expect popover to be closed
    await waitFor(() => {
      expect(popover).not.toBeInTheDocument()
    })
    // Expect input to have suggestion value
    expect(routerPush).toBeCalledWith({
      pathname: '/',
      search: new URLSearchParams({ search: mocks.suggestion.suggestions[0] }).toString()
    })
  })

  it('should x button appear when input has more than 1 value', () => {
    setup()
    const testValue = 'A'
    const clearButtonBefore = screen.queryByTestId('clear-button')
    expect(clearButtonBefore).not.toBeInTheDocument()
    // Enter valid input value to make clear button show up
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    fireEvent.input(autocompleteInput, { target: { value: testValue } });
    // Expect x button to show up
    const clearButtonAfter = screen.queryByTestId('clear-button')
    expect(clearButtonAfter).toBeInTheDocument()
  })

  it('should x button remove popover when click', async () => {
    setup()
    const testValue = 'Test'
    // Enter valid input value to clear button show up & trigger popover

    const autocompleteInput = screen.getByTestId('autocomplete-input')
    act(() => {
      autocompleteInput.focus()
      fireEvent.input(autocompleteInput, { target: { value: testValue } });
    })
    const clearButton = screen.getByTestId('clear-button')
    // Expect all to be on screen
    const popover = screen.getByTestId('autocomplete-popover')
    expect(popover).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
    // Click x button
    await userEvent.click(clearButton)
    // Popover be removed from screen
    expect(popover).not.toBeInTheDocument()
  })

  it('should x button reset input form', async () => {
    setup()
    const testValue = 'Test'
    // Enter valid input value to clear button show up
    const autocompleteInput = screen.getByTestId('autocomplete-input')
    act(() => {
      autocompleteInput.focus()
      fireEvent.input(autocompleteInput, { target: { value: testValue } });
    })
    //
    expect(autocompleteInput).toHaveDisplayValue(testValue)
    //
    const clearButton = screen.getByTestId('clear-button')
    expect(clearButton).toBeInTheDocument()
    // Click x button
    await userEvent.click(clearButton)
    // Expect input to be cleared and x button be removed from dom
    expect(autocompleteInput).toHaveDisplayValue('')
    expect(clearButton).not.toBeInTheDocument()
  })
})