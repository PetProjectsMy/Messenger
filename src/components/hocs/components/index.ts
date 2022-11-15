import { Block } from "core/dom";
import { Button } from "components/buttons";
import { Input } from "components/inputs/basic-input";
import { WithStore } from "../with-store";

export const WithStoreBlock = WithStore(Block);
export const WithStoreButton = WithStore(Button);
export const WithStoreInput = WithStore(Input);
