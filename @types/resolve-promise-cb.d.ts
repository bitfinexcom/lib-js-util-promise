export function resolvePromiseCb<T>(err?: Error, res?: T): Promise<T>
export function resolvePromiseCb<T>(err?: Error, res?: T, cb: (err?: Error, res?: T) => void): void
