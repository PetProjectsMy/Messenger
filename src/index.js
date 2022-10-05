"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const renderDOM_1 = __importDefault(require("./utils/renderDOM"));
// import registerComponent from "./utils/register-component";
const login_1 = __importDefault(require("./pages/login"));
const components_1 = __importDefault(require("./components"));
// import components from "./components/**/index.ts";
document.addEventListener("DOMContentLoaded", () => {
    // registerComponent(Button);
    const loginPage = new login_1.default();
    const button = new components_1.default({
        label: "Click me",
        events: {
            click: () => {
                console.log("Click");
                debugger;
            },
        },
    });
    (0, renderDOM_1.default)("#app", button);
});
