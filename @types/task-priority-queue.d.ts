export class TaskPriorityQueue {
  constructor(concurrency?: number)
  public pushTask<T>(task: () => Promise<T>, priority: number): Promise<T>
}
