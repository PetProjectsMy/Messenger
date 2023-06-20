import path from "path";
import { buildConfig } from "./config/webpack/build-config";
import {
  EnumBuildModes,
  type IBuildPaths,
} from "./config/webpack/types/config";

const paths: IBuildPaths = {
  context: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "build"),
  entry: "./index.ts",
  html: "./index.html",
};

let mode: EnumBuildModes;
switch (process.env.BUILD_MODE) {
  case "development":
    mode = EnumBuildModes.Development;
    break;
  case "production":
    mode = EnumBuildModes.Production;
    break;
  default:
    mode = EnumBuildModes.Development;
}

const config = buildConfig({
  mode,
  paths,
  port: 4200,
});

export default config;
