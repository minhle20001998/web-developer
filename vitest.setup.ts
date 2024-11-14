// vitest.setup.ts
import '@testing-library/jest-dom' // Add jest-dom matchers for better assertions
import {vi} from 'vitest'
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
;(global.DragEvent as unknown) = vi.fn(() => ({
  dataTransfer: {
    setData: vi.fn(),
    getData: vi.fn(),
    effectAllowed: '',
    dropEffect: ''
  },
  preventDefault: vi.fn()
}))
;(global.ClipboardEvent as unknown) = vi.fn(() => ({
  clipboardData: {
    getData: vi.fn(),
    setData: vi.fn()
  }
}))

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})