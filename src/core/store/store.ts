import EventBus from "../event-bus";

export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  page: null,
  loginFormError: null,
  user: null,
};

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any
) => void;

export const enum StoreEvent {
  CHANGED = "changed",
}

type EventHanlderArgs = {
  [StoreEvent.CHANGED]: [any, any];
};

export class Store<State extends Record<string, any>> extends EventBus<
  typeof StoreEvent,
  EventHanlderArgs
> {
  private state: State = {} as State;

  constructor(state: State) {
    super();

    this.state = state;
    this.set(state);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };

    const oldState = JSON.stringify(this.state);
    this.state = { ...this.state, ...nextState };
    console.log(
      `${oldState}\n${"-".repeat(30)}\n${JSON.stringify(this.state)}`
    );

    this.emit(StoreEvent.CHANGED, prevState, this.state);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set({ ...this.state, ...nextStateOrAction });
    }
  }
}
