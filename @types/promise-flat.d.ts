/**
 * Returns promise and separated resolve, reject methods
 */
export function promiseFlat<TResult>(): {
  promise: Promise<TResult>,
  resolve: (res: TResult) => void,
  reject: (err: Error) => void
}
