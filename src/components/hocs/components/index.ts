import { Block } from "core/dom";
import { Button } from "components/buttons";
import { WithStore } from "../with-store";

export const WithStoreBlock = WithStore(Block);
export const WithStoreButton = WithStore(Button);
