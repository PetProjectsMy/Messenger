import { Block } from "core/dom";
import { WithRouter } from "components/hocs";
import { Link } from "components";
import template from "./template";
import { EnumNavigationPageLinks, MapNavigationLinkToProps } from "./links";

export class NavigationPage extends Block {
  constructor() {
    const LinkWithRouter = WithRouter(Link);
    const linkElements = Object.values(EnumNavigationPageLinks).reduce(
      (acc: any[], linkName: EnumNavigationPageLinks) => {
        const props = MapNavigationLinkToProps[linkName];
        acc.push(
          new LinkWithRouter({
            props,
          })
        );
        return acc;
      },
      []
    );

    super({
      children: { links: linkElements },
      props: { componentName: "Navigation Page" },
    });
  }

  render(): string {
    return template;
  }
}
