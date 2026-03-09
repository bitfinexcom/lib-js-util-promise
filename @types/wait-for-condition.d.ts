export function waitForCondition<T>(action: () => Promise<T>|T, opts?: { timeoutMs?: number, intervalMs?: number }): Promise<T>
