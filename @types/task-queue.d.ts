export class TaskQueue {
  constructor(concurrency?: number)
  public pushTask<T>(task: () => Promise<T>): Promise<T>
}
