import { Block } from "core/dom";
import template from "./template";

type ErrorPageProps = WithComponentCommonProps<{
  errorCode: number;
  errorDescription: string;
}>;
export type TErrorPage = Block<ErrorPageProps>;
export type TErrorPageClass = typeof Block<ErrorPageProps>;

function getErrorPageClass(initProps: ErrorPageProps): TErrorPageClass {
  class ErrorPage extends Block<ErrorPageProps> {
    constructor() {
      super({ props: initProps });
    }

    protected render(): string {
      return template;
    }
  }

  return ErrorPage;
}

export const NotFoundErrorPage: TErrorPageClass = getErrorPageClass({
  errorCode: 404,
  errorDescription: "Page Not Found",
});

export const AuthorizationRequiredErrorPage: TErrorPageClass =
  getErrorPageClass({
    errorCode: 403,
    errorDescription: "Authorization Required",
  });
