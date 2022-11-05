export interface CoreRouter {
  start(startURL: string): void;

  use(path: string, callback: () => void): CoreRouter;

  go(path: string): void;

  back(): void;

  forward(): void;
}
