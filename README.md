# Task Management API

A production-grade REST API for managing tasks and workflows. Built with Node.js, Express, and TypeScript, this API provides a complete, validated, and documented backend service that handles task creation, assignment, prioritization, and lifecycle management with comprehensive error handling and automated testing.

## Overview

This API is designed as a foundational service that can be integrated into any task management frontend, project management tool, or automation pipeline. It implements strict input validation, structured error responses, pagination, filtering, and role-aware access patterns to serve as a reliable backend for production workloads.

Every endpoint follows RESTful conventions, returns consistent JSON responses, and is covered by integration and unit tests to ensure reliability across deployments.

## Features

- **Full CRUD Operations** -- Create, read, update, and delete tasks with a clean RESTful interface
- **Task Lifecycle Management** -- Status transitions (todo, in progress, completed) with validation rules preventing invalid state changes
- **Priority Levels** -- Configurable priority tiers (low, medium, high, critical) with sorting and filtering support
- **Input Validation** -- Comprehensive request validation at the controller and schema level, returning clear error messages for malformed input
- **Pagination and Filtering** -- Query parameters for paginated results, field-based filtering, and configurable page sizes
- **Structured Error Handling** -- Centralized error middleware returning consistent error objects with status codes, messages, and correlation details
- **TypeScript Throughout** -- End-to-end type safety from route definitions through controllers to database models
- **Automated Testing** -- Unit and integration test suites covering all endpoints, edge cases, and error paths
- **API Documentation** -- Complete endpoint documentation with request/response schemas, query parameters, and usage examples

## Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Validation | Express middleware + custom validators |
| Testing | Jest, Supertest |
| Documentation | Inline API docs |

## Architecture

```
task-management-api/
  src/
    controllers/        # Request handlers with validation logic
    models/             # Mongoose schemas and type definitions
    routes/             # Express route definitions
    middleware/         # Error handling, validation, logging
    config/             # Database connection and environment config
    types/              # Shared TypeScript interfaces and types
    utils/              # Helper functions and utilities
    tests/              # Unit and integration test suites
  dist/                 # Compiled JavaScript output
```

**Request Lifecycle:**

1. Incoming request passes through middleware stack (logging, parsing, validation)
2. Route handler delegates to the appropriate controller
3. Controller validates business rules and interacts with the database layer
4. Database operations go through typed Mongoose models
5. Response is formatted and returned with consistent structure
6. Errors are caught by the centralized error handler and returned as structured JSON

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | List tasks with pagination and filters |
| GET | `/api/tasks/:id` | Get a single task by ID |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Query Parameters (GET /api/tasks)

| Parameter | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `status` | string | Filter by status: todo, in-progress, completed |
| `priority` | string | Filter by priority: low, medium, high, critical |
| `sortBy` | string | Sort field (e.g., createdAt, priority, dueDate) |
| `order` | string | Sort order: asc or desc |

### Response Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Task created successfully"
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Task title is required",
    "details": [...]
  }
}
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn

### Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-management
NODE_ENV=development
```

### Installation

```bash
git clone https://github.com/abdomohamed911/task-management-api.git
cd task-management-api
npm install
```

### Run Locally

```bash
npm run dev
```

The API server starts at `http://localhost:3000`.

### Run Tests

```bash
npm test
```

### Build for Production

```bash
npm run build
npm start
```

## Error Handling

The API implements a layered error handling strategy:

- **Validation errors** return 400 with field-level detail messages
- **Not found errors** return 404 with the resource identifier that was not found
- **Duplicate entry errors** return 409 for conflicting resource creation
- **Server errors** return 500 with a generic message in production, full details in development

All errors are processed through a centralized middleware that ensures consistent response formatting and logs errors with context for monitoring.

## License

MIT

---

**Abdelrahman Mohamed** | [GitHub](https://github.com/abdomohamed911)
