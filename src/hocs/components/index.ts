import { Block } from "core/dom";
import {
  Button,
  Input,
  InputWithValidation,
  FileInput,
  TextComponent,
} from "components";
import { WithStore } from "../with-store";

export const WithStoreBlock = WithStore(Block);
export const WithStoreButton = WithStore(Button) as any as typeof Button;
export const WithStoreInput = WithStore(Input) as any as typeof Input;
export const WithStoreFileInput = WithStore(
  FileInput
) as any as typeof FileInput;
export const WithStoreTextComponent = WithStore(
  TextComponent
) as any as typeof TextComponent;
export const WithStoreValidatedInput = WithStore(
  InputWithValidation
) as any as typeof InputWithValidation;
