// import { Store, defaultState } from "core/store";
// import { initRouter, CoreRouter, Router } from "core/router";
// import { initApp } from "services/init-app";
import { MainPage } from "core/dom/renderDOM";
import { NavigationPage } from "pages";

// declare global {
//   interface Window {
//     store: Store<AppState>;
//     router: CoreRouter;
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  MainPage.component = new NavigationPage();

  // const store = new Store<AppState>(defaultState);
  // const router = new Router();
  // window.router = router;
  // window.store = store;
  // window.onpopstate = () => {
  //   console.log("onpopstate log");
  // };
  // initRouter(router, store);
  // store.dispatch(initApp);
});
