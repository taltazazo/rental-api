import CustomError from "./CustomError";

class ValidationError extends CustomError {
  errorCode = 400;
  errorType = "validation_error";

  constructor(message: string) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default ValidationError;
