/**
 * Wait until specific time before resolving the promise
 *
 * @param ms Time in milliseconds until promise is resolved
 */
export function promiseSleep(ms: number): Promise<void>

/**
 * Wait until specific time before resolving the promise
 *
 * @param ms Time in milliseconds until promise is resolved
 * @param retVal Optional return value that is resolved
 */
export function promiseSleep<TResult>(ms: number, retVal: TResult): Promise<TResult>
