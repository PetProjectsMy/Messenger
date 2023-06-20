import TerserPlugin from "terser-webpack-plugin";
import { EnumBuildModes } from "./types/config";

export function buildMinimizer(mode: EnumBuildModes) {
  return new TerserPlugin({
    terserOptions: {
      compress: {
        drop_console: mode === EnumBuildModes.Production,
      },
    },
  });
}
