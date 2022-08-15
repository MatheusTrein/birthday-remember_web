class AuthTokenError extends Error {
  constructor() {
    super("Invalid Token");
  }
}

export { AuthTokenError };
