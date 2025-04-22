# Flight Management App

A web application for managing worker flights, built with Angular.

## Overview

This application allows you to:
- View a list of workers
- See flights assigned to each worker
- View detailed flight information
- Auto-refresh flight data every 10 seconds

## Prerequisites

- Node.js (v16.x or later recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd worker-flights-app
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.

## Build for production

To build the application for production, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Tests

The application uses Jest for unit testing. To run the tests:

```bash
# Run all tests
npm test

# Run tests with watch mode (for development)
npm test -- --watch

# Run tests for a specific component
npm test -- --testPathPattern=flights-table

# Generate test coverage report
npm test -- --coverage
```

Test files are located next to the files they are testing with a `.spec.ts` suffix.

## Project Structure

- `src/app/components/` - Contains all the components
  - `workers-list/` - Shows all available workers
  - `flights-table/` - Displays flights for the selected worker
  - `flight-details/` - Shows detailed information about the selected flight
- `src/app/services/` - Contains services for data fetching and management
- `src/app/models/` - Contains interfaces for TypeScript type safety
- `src/app/pipes/` - Contains custom pipes (including duration formatting)

## Features

- **Worker Selection**: Click on a worker to view their flights
- **Auto-refresh**: Flight data refreshes automatically every 1 minute
- **Flight Selection**: First flight is selected by default, click on other flights to view their details
- **Duration Formatting**: Flight duration is displayed in a user-friendly format (e.g., 5h 50m)

## Notes

- The app uses Angular's standalone components and signals for better performance
- HTTP requests are made to an API server at http://128.24.65.53:3000/

## Tech Stack

- Angular 17
- TypeScript
- RxJS
- Angular Signals
- HTTP Client
- Jest (for testing)
