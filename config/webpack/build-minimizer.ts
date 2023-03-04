import terserPlugin from "terser-webpack-plugin";
import { EnumBuildModes } from "./types/config";

export function buildMinimizer(mode: EnumBuildModes) {
  return new terserPlugin({
    terserOptions: {
      compress: {
        drop_console: mode === EnumBuildModes.Production,
      },
    },
  });
}
