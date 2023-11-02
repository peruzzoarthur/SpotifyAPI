export class CustomError extends Error {
  response: {
    status: number;
  };

  constructor(message: string, status: number) {
    super(message);
    this.response = {
      status: status,
    };
  }
}
