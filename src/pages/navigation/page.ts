import { Block } from "core/dom";
import { WithRouter } from "hocs";
import { Link } from "components";
import { LogoutButton } from "components/buttons/logout-button";
import template from "./template";
import { EnumNavigationPageLinks, MapNavigationLinkToProps } from "./links";

export class NavigationPage extends Block {
  constructor() {
    const children: TComponentChildren = {};

    const LinkWithRouter = WithRouter(Link);
    children.links = Object.values(EnumNavigationPageLinks).reduce(
      (acc: any[], linkName: EnumNavigationPageLinks) => {
        const props = MapNavigationLinkToProps[linkName];
        acc.push(
          new LinkWithRouter({
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

    children.logoutButton = new LogoutButton();

    super({
      children,
      componentName: "Navigation Page",
    });
  }

  render(): string {
    return template;
  }
}
