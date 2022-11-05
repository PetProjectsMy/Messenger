import { Store, StoreEvent } from "core/store";
import { Router } from "core/router";
import { renderDOM } from "core/dom";
import { getPageComponent, Pages } from "pages/pages-list";

const routes = [
  {
    path: "/signup",
    block: Pages.SignUp,
    needAuthorization: false,
  },
  {
    path: "/login",
    block: Pages.Login,
    needAuthorization: false,
  },
  {
    path: "/chats",
    block: Pages.Chats,
    needAuthorization: true,
  },
  {
    path: "/profile",
    block: Pages.Profile,
    needAuthorization: true,
  },
  {
    path: "*",
    // Исправить
    block: Pages.Error404,
    needAuthorization: false,
  },
];

export function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentPage = Boolean(store.getState().page);

      if (isAuthorized || !route.needAuthorization) {
        store.dispatch({ page: route.block });
        return;
      }

      if (!currentPage) {
        store.dispatch({ page: Pages.Login });
      }
    });
  });

  store.on(StoreEvent.CHANGED, (prevState: AppState, nextState: AppState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      const startURL = window.store.getState().user ? "/profile" : "/login46";
      router.start(startURL);
    }

    if (prevState.page !== nextState.page) {
      if (!nextState.page) {
        throw new Error(
          `Incorrect app page ${
            nextState.page
          } of type ${typeof nextState.page} of store next state page`
        );
      }

      console.log(`Page changing: ${prevState.page} -> ${nextState.page}`);
      const PageComponent = getPageComponent(nextState.page);
      const page = new PageComponent();
      renderDOM({ component: page });
      document.title = `App / ${page.componentName}`;
    }
  });
}
