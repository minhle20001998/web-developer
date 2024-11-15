# Searching Website

## Description
This project, 'Searching Website', is a web application designed to provide search function to user and display the results with highlighted words

## Assumption
- Highlighted words in suggestions are based on `stemmedQueryTerm` field in the API rather than the user input

## Features
- Fetch and display search results in format
- Provide suggestions in search bar

## Techstack
- **Framework**: Next.js
- **Testing**: Vitest, React Testing Library

## Installation
To install the project, follow these steps:

```bash
npm install
```

## Environment Setup
To run this project, you will need to set up the following environment variables. You can do this by creating a `.env` file in the root directory of the project and adding the following key-value pairs:

```plaintext
NEXT_PUBLIC_RESULTS_API=https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json
NEXT_PUBLIC_SUGGESTION_API=https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json
```

## Starting project
To start the project, follow these steps

```bash
npm run dev
```

## Running unit tests
To run unit tests for the project, follow these steps

- Run all tests
```bash
npm run test
```

- Run test coverage
```bash
npm run test:cov
```

- Run test report
```bash
npm run test:report
```

- Run test with UI
```bash
npm run test:ui
```
