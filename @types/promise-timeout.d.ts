/**
 * Run a promise with an execution timeout
 *
 * @param promise Promise that timeout will be checked against
 * @param ms Time in milliseconds until promise is timed out
 * @param errMsg Custom error message for PromiseTimeoutError
 */
export function promiseTimeout<TResult>(
  promise: Promise<TResult> | (() => Promise<TResult>) | TResult | (() => TResult),
  ms: number,
  errMsg?: string
): Promise<TResult>

export class PromiseTimeoutError extends Error {
  constructor(message?: string)
}
