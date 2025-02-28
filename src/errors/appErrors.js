class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
    }
}

class CustomValidationError extends AppError {
    constructor(message) {
        super(message, 400);
        this.errors = {};
    }
}

class NotFoundError extends AppError {
    constructor(message = "Resource not found.") {
        super(message, 404);
    }
}

class GoneError extends AppError {
    constructor(message = "Invalid resource state.") {
        super(message, 410);
    }
}

class ConflictError extends AppError {
    constructor(message = "Conflict with the current state of the resource.") {
        super(message, 409);
    }
}

class UnprocessableEntityError extends AppError {
    constructor(message = "Valid data, but not processable.") {
        super(message, 422);
    }
}

class InternalServerError extends AppError {
    constructor(message = "Internal server error.") {
        super(message, 500);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized.") {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = "Forbidden.") {
        super(message, 403);
    }
}

module.exports = {
    AppError,
    CustomValidationError,
    NotFoundError,
    GoneError,
    ConflictError,
    UnprocessableEntityError,
    InternalServerError,
    UnauthorizedError,
    ForbiddenError,
};
