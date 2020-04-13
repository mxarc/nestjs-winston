/**
 * Creates the token for a logger with a context identifier
 * @param context The context of the logger
 */
export const getLoggerToken = (context = 'app'): string =>
  `LoggerService${context}`;
