import { LogoutButton } from "components/buttons/logout-button";
import { WithStoreBlock, WithRouterLink } from "hocs/components";
import template from "./template";
import { EnumNavigationPageLinks, MapNavigationLinkToProps } from "./links";

export class NavigationPage extends WithStoreBlock {
  constructor() {
    const children: TComponentChildren = {};

    children.logoutButton = new LogoutButton();

    super({
      children,
      componentName: "Navigation Page",
    });
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();

    this.createLinks();
  }

  public createLinks() {
    const isUserAuthorized = this.store.isUserAuthorized();
    let linksList = Object.values(EnumNavigationPageLinks);
    if (isUserAuthorized) {
      linksList = linksList.filter(
        (link) =>
          link !== EnumNavigationPageLinks.SignUp &&
          link !== EnumNavigationPageLinks.Login
      );
    }

    this.children.links = linksList.reduce(
      (acc: any[], linkName: EnumNavigationPageLinks) => {
        const props = MapNavigationLinkToProps[linkName];
        acc.push(
          new WithRouterLink({
            props: {
              ...props,
              htmlWrapper: {
                componentAlias: "wrapped",
                htmlWrapperTemplate: `
                <div class="naviagtion-link">
                  {{{ wrapped }}}
                </div>
                `,
              },
            },
          })
        );
        return acc;
      },
      []
    );
  }

  render(): string {
    return template;
  }
}
