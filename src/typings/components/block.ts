import { type Block } from "core/dom";
import type { TEventHandler } from "core/event-bus";

type TEventListener = EventListener;

declare global {
  export namespace ComponentTypings {
    export type BlockClass<
      P extends CommonProps = CommonProps,
      S extends State = State
    > = typeof Block<P, S>;

    export type EventHandler = TEventHandler;
    export type EventListener = TEventListener;

    export type CommonHTMLAttributes = {
      htmlAttributes?: {
        name?: string;
        id?: string;
      };
    };
    export type OptionalProps = {
      events?: Record<string, EventHandler[]>;
      htmlClasses?: string[];
      htmlStyle?: {
        "background-image"?: any;
        display?: "none" | "block";
      };
      htmlWrapper?: HTMLWrapper;
    };

    export type CommonProps = CommonHTMLAttributes & OptionalProps;
    export type WithCommonHTMLAttributes<THtmlAttrs> = CommonHTMLAttributes &
      THtmlAttrs;
    export type WithCommonProps<TProps> = TProps & CommonProps;

    export type Child = Block;
    export type ChildArray = Child[];
    export type Children = Record<string, Child | ChildArray>;

    export type Refs = Record<string, Block>;
    export type State = Record<string, unknown>;
    export type Helpers = Record<string, unknown>;
    export type HTMLWrapper = {
      componentAlias: string;
      htmlWrapperTemplate: string;
    };
  }
}

export {};
