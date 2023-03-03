import { type Configuration as webpackConfiguration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildLoaders } from "./build-loaders";
import { buildPlugins } from "./build-plugins";
import { buildResolvers } from "./build-resolvers";
import { EnumBuildModes, IConfigBuildOptions } from "./types/config";

export function buildConfig(
  options: IConfigBuildOptions
): webpackConfiguration & DevServerConfiguration {
  const { paths, mode, port } = options;
  const isDevMode = mode === EnumBuildModes.Development;

  return {
    context: paths.context,
    entry: {
      app: paths.entry,
    },
    output: {
      path: paths.build,
      filename: isDevMode ? "[name].js" : "[name].[contenthash].js",
      clean: true,
    },
    devServer: { port, hot: isDevMode, historyApiFallback: true },
    resolve: buildResolvers(),
    module: {
      rules: buildLoaders(),
    },
    plugins: buildPlugins({ mode }),
  };
}
