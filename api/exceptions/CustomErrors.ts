export class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class DuplicateEntryError extends AppError {
  constructor(message = "Duplicate Entry") {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

// Erreur de validation Mongoose
export class MongooseValidationError extends BadRequestError {
  constructor(message = "Invalid input data") {
    super(message);
  }
}

// Erreur de duplication Mongoose (équivalent de DuplicateEntryError)
export class MongooseDuplicateError extends DuplicateEntryError {
  constructor(message = "Duplicate key error") {
    super(message);
  }
}

// Erreur de connexion à la base de données
export class DatabaseConnectionError extends InternalServerError {
  constructor(message = "Database connection error") {
    super(message);
  }
}
