// import { ChatsPage, NavigationPage } from "pages";
import { MainPage } from "core/renderDOM";
import { ChatsPage, NavigationPage } from "pages";

document.addEventListener("DOMContentLoaded", () => {
  MainPage.component = new ChatsPage();
});
