export default class EventBus {
  private static instance: EventBus | null = null;

  private listeners: { [event: string]: ComponentEventListener[] } = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): EventBus {
    let { instance } = EventBus;

    if (!instance) {
      instance = new EventBus();
    }

    return instance;
  }

  public on(event: string, callback: ComponentEventListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: ComponentEventListener): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
