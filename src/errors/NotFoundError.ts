import CustomError from "./CustomError";

class NotFoundError extends CustomError {
  errorCode = 404;
  errorType = "not_found_error";

  constructor(message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotFoundError;
