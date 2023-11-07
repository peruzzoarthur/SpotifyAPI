interface ICustomError {
  message: string;
  status: number | undefined;
}
export class CustomError implements ICustomError {
  message: string;
  status: number | undefined;

  constructor(message: string, status: number | undefined) {
    this.message = message;
    this.status = status;
  }
}

export type SpotifyError = {
  status: number;
  message: string;
};
