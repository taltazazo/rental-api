abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;

  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string }[];
}

export default CustomError;
