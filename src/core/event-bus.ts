export type TEventHandler<Args extends any[] = unknown[]> = (
  ...args: Args
) => void;
export class EventBus<
  Events extends Record<string, string>,
  Args extends Record<Values<Events>, unknown[]>
> {
  private readonly listeners: {
    [Event in Values<Events>]?: TEventHandler<Args[Event]>[];
  } = {};

  public on<Event extends Values<Events>>(
    event: Event,
    callback: TEventHandler<Args[Event]>
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  public off<Event extends Values<Events>>(
    event: Event,
    callback: TEventHandler<Args[Event]>
  ): void {
    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback
    );
  }

  emit<Event extends Values<Events>>(event: Event, ...args: Args[Event]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach((listener) => {
      listener(...args);
    });
  }
}
