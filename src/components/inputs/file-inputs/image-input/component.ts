import {
  TBasucFileInputProps,
  BasicFileInputDefaultProps,
  getFileInputClass,
} from "components/inputs/file-inputs";
import { deepMerge } from "utils/objects-handle";

type TImageInputProps = TBasucFileInputProps & {
  htmlAttributes?: { accept: "image/*" };
};

const ImageInputDefaultProps: TImageInputProps = deepMerge(
  BasicFileInputDefaultProps,
  {
    htmlAttributes: { type: "file", accept: "image/*" },
  }
);

export const ImageInput = getFileInputClass<TImageInputProps>(
  ImageInputDefaultProps
);
