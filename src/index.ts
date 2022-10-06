import Block from "core/block";
import { LoginPage, NavigationPage } from "pages";
import renderDOM from "core/renderDOM";

const Page: { component: Nullable<Block> } = new Proxy(
  { component: null },
  {
    set(target, prop, block: Block) {
      if (prop === "component") {
        target[prop] = block;
        renderDOM("#app", block);
      }
      return true;
    },
  }
);

const linkIDToPageMap = {
  login: LoginPage,
};

document.addEventListener("DOMContentLoaded", () => {
  Page.component = new NavigationPage();
  // Page.component = new Button({ label: "click" });
});

// Object.entries(linkIDToPageMap).forEach(([id, Component]) => {
//   const linkElement = document.querySelector(`button[id='${id}_link']`);
//   linkElement.addEventListener("click", () => {
//     console.log(`click on the ${id} link`);
//     Page.component = new Component();
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   renderDOM("#app", new LoginPage());
// });
