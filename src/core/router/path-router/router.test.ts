import { EnumAppRoutes } from "../app-routes";
import { PathRouter } from "./router";

describe("Test Path Router", () => {
  const router: PathRouter = new PathRouter();

  describe("Match Route By PathName", () => {
    test.each([
      ["/navigation", EnumAppRoutes.NavigationPage],
      ["/signup", EnumAppRoutes.SignUp],
      ["/login", EnumAppRoutes.Login],
      ["/chats", EnumAppRoutes.Chats],
      ["/profile", EnumAppRoutes.Profile],
    ])("match %p expecting %p", (pathName, appRoute) => {
      const result = router.matchRouteByPath(pathName).route;
      expect(result).toBe(appRoute);
    });
  });
});
