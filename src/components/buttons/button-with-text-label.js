"use strict";
/* eslint-disable @typescript-eslint/no-useless-constructor */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = __importDefault(require("../core/block"));
const template = `
<button 
  type="button" 
  {{#if className}}class="{{className}}"{{/if}}
>
  {{ label }}
</button>
`;
class Button extends block_1.default {
    constructor(props) {
        super(props);
    }
    render() {
        return template;
    }
}
exports.default = Button;
