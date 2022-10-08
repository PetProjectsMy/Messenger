import { MainPage } from "core/renderDOM";
import { NavigationPage } from "pages";

document.addEventListener("DOMContentLoaded", () => {
  MainPage.component = new NavigationPage();
});
