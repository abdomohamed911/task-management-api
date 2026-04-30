# Task Management API

[![CI](https://github.com/abdomohamed911/task-management-api/actions/workflows/ci.yml/badge.svg)](https://github.com/abdomohamed911/task-management-api/actions/workflows/ci.yml)

A production-grade REST API for managing tasks with filtering, pagination, statistics, and comprehensive testing. Built with Node.js and Express following clean MVC architecture.

## Overview

This API provides a complete backend for task management with CRUD operations, status tracking, priority levels, and real-time statistics. Every endpoint follows RESTful conventions, returns consistent JSON responses, and is covered by 41 unit and integration tests. The architecture separates concerns across controllers, services, models, middleware, and routes for maintainability and testability.

## Features

- **Full CRUD Operations** -- Create, read, update, and delete tasks with a clean RESTful interface
- **Task Lifecycle Management** -- Status transitions (pending, in-progress, completed, cancelled) with validation
- **Priority Levels** -- Low, medium, and high priority tiers with sorting and filtering support
- **Input Validation** -- Request validation with clear error messages for malformed input
- **Pagination and Filtering** -- Query parameters for paginated results, status/priority filtering, and configurable page sizes
- **Task Statistics** -- Aggregated statistics by status and priority via `/api/v1/tasks/statistics`
- **Structured Error Handling** -- Centralized error middleware with status-code-mapped error types
- **Security** -- Helmet security headers, CORS configuration, and rate limiting (100 req/15min)
- **Automated Testing** -- 41 tests across unit and integration suites with coverage reporting
- **Docker Support** -- Multi-stage Dockerfile for production deployment

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express 4 |
| Language | JavaScript (ES Modules) |
| Storage | In-memory Map (database-ready architecture) |
| Security | Helmet, CORS, express-rate-limit |
| Validation | Custom express middleware |
| Testing | Jest, Supertest |
| CI/CD | GitHub Actions |
| Containerization | Docker (multi-stage build) |

## Architecture

```
task-management-api/
  src/
    controllers/        # Request handlers
    models/             # Task model with validation
    routes/             # Express route definitions
    services/           # Business logic and data access
    middleware/         # Error handling, validation
    utils/              # Pagination, ApiError
    app.js              # Express app setup
    index.js            # Server entry point
  tests/
    unit/               # Unit tests (services, pagination)
    integration/        # Integration tests (API endpoints)
  .github/workflows/    # CI pipeline
  Dockerfile            # Production container
  .env.example          # Environment template
```

**Request Lifecycle:**

1. Incoming request passes through middleware stack (helmet, CORS, rate limiting, JSON parsing)
2. Route handler delegates to the appropriate controller
3. Controller validates input and delegates to the service layer
4. Service layer applies business logic, filtering, sorting, and pagination
5. Response is formatted and returned with consistent structure
6. Errors are caught by the centralized error handler and returned as structured JSON

## API Endpoints

### Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check (returns `{ ok: true, timestamp }`) |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/tasks` | Create a new task |
| GET | `/api/v1/tasks` | List tasks with pagination and filters |
| GET | `/api/v1/tasks/statistics` | Get task statistics by status and priority |
| GET | `/api/v1/tasks/:id` | Get a single task by ID |
| PUT | `/api/v1/tasks/:id` | Update an existing task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |

### Query Parameters (GET /api/v1/tasks)

| Parameter | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10, max: 100) |
| `status` | string | Filter by status: pending, in-progress, completed, cancelled |
| `priority` | string | Filter by priority: low, medium, high |
| `sort` | string | Sort field (default: createdAt) |

### Response Format

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2025-01-15",
    "tags": [],
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Task title is required and must be a non-empty string"
  }
}
```

## Quick Start

### Prerequisites

- Node.js 18+

### Setup

```bash
git clone https://github.com/abdomohamed911/task-management-api.git
cd task-management-api

# Install dependencies
npm install

# Start development server
npm run dev
```

The API server starts at `http://localhost:3000`.

### Run Tests

```bash
# Run all tests with coverage
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration
```

### Docker

```bash
# Build and run
docker build -t task-api .
docker run -p 3000:3000 -e CORS_ORIGIN=http://localhost:3000 task-api
```

## Results

| Metric | Value |
|---|---|
| Total tests | 41 (3 suites) |
| Unit tests | 29 (service + pagination) |
| Integration tests | 12 (all API endpoints) |
| API endpoints | 7 (including health + statistics) |
| Error types | 8 (400-500 status codes mapped) |

## What I Learned

1. **In-memory storage is great for prototyping but hides real-world bugs**: The Map-based store made development fast, but it masked issues like shared state between tests. Adding a `resetStore()` function and calling it in `beforeEach` was essential for test isolation. In a real database, transactions or test database cleanup would serve the same purpose.

2. **Custom error classes with status-code mapping improve API consistency**: Creating an `ApiError` class that automatically maps HTTP status codes to semantic error codes (VALIDATION_ERROR, NOT_FOUND, etc.) eliminates the need for ad-hoc error formatting in every controller. The centralized error handler then produces uniform responses across all endpoints.

3. **Pagination logic has more edge cases than expected**: Negative limits, zero limits, NaN, and values exceeding the maximum all need handling. Normalizing these inputs before slicing prevents off-by-one errors and ensures the API contract is predictable for frontend consumers.

## License

MIT

---

**Abdelrahman Mohamed** | [GitHub](https://github.com/abdomohamed911)
