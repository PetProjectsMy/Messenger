"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const block_1 = __importDefault(require("core/block"));
const template = `
<button 
  type="button" 
  {{#if className}}class="{{className}}"{{/if}}
  style="
    background-image: url('{{iconPath}}');
    background-size: cover; 
    height: 100px;
    width: 100px;
  "
>
  {{ label }}
</button>
`;
class Button extends block_1.default {
    constructor(props) {
        super({
            name: "ButtonWithIcon",
            classname: props.classname ?? "button_with_icon",
            ...props,
            events: {
                click: () => {
                    console.log("click button with icon");
                },
            },
        });
    }
    render() {
        return template;
    }
}
exports.Button = Button;
