import { LogoutButton } from "components/buttons/logout-button";
import { WithRouterLink, WithStoreBlock } from "hocs/components";
import { EnumNavigationPageLinks, MapNavigationLinkToProps } from "./links";
import template from "./template";

export class NavigationPage extends WithStoreBlock {
  constructor() {
    super({
      componentName: "Navigation Page",
    });
  }

  public init() {
    this._createLogoutButton();
    this._createLinks();
  }

  protected _afterPropsAssignHook() {
    super._afterPropsAssignHook();
    this.init();
  }

  private _createLogoutButton() {
    if (this.store.isUserAuthorized()) {
      this.children.logoutButton = new LogoutButton();
    }
  }

  private _createLinks() {
    let linksList: EnumNavigationPageLinks[];
    if (this.store.isUserAuthorized()) {
      linksList = [
        EnumNavigationPageLinks.Chats,
        EnumNavigationPageLinks.Profile,
      ];
    } else {
      linksList = [
        EnumNavigationPageLinks.SignUp,
        EnumNavigationPageLinks.Login,
      ];
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
                <div class="navigation-link">
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
