import renderDOM from "./utils/renderDOM";
// import registerComponent from "./utils/register-component";
import LoginPage from "./pages/login";
import Button from "./components";

// import components from "./components/**/index.ts";

document.addEventListener("DOMContentLoaded", () => {
  // registerComponent(Button);

  const loginPage = new LoginPage();

  const button = new Button({
    label: "Click me",
    events: {
      click: () => {
        console.log("Click");
        debugger;
      },
    },
  });

  renderDOM("#app", button);
});
