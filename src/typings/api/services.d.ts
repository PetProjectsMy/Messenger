declare global {
  export type TAfterRequestCallback = (response: any) => Promise<void> | void;
}

export {};
