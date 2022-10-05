"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_hbs_1 = __importDefault(require("./login.hbs"));
const components_1 = __importDefault(require("../../components"));
const block_1 = __importDefault(require("../../components/core/block"));
class LoginPage extends block_1.default {
    render() {
        return this.compile(login_hbs_1.default, {});
    }
    initChildren() {
        this.children.button = new components_1.default({
            label: "Click me",
            events: {
                click: () => {
                    console.log("click");
                },
            },
        });
    }
}
exports.default = LoginPage;
