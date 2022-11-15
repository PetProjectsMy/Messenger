import { Block } from "core/dom";
import { Button, Input, InputWithValidation, FileInput } from "components";
import { WithStore } from "../with-store";

export const WithStoreBlock = WithStore(Block);
export const WithStoreButton = WithStore(Button);
export const WithStoreInput = WithStore(Input);
export const WithStoreFileInput = WithStore(
  FileInput
) as any as typeof FileInput;
export const WithStoreValidatedInput = WithStore(InputWithValidation);
