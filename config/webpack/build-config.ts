import { type Configuration as webpackConfiguration } from "webpack";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildLoaders } from "./build-loaders";
import { buildMinimizer } from "./build-minimizer";
import { buildPlugins } from "./build-plugins";
import { buildResolvers } from "./build-resolvers";
import { EnumBuildModes, IConfigBuildOptions } from "./types/config";

type TConfig = webpackConfiguration & DevServerConfiguration;

export function buildConfig(options: IConfigBuildOptions): TConfig {
  const { paths, mode, port } = options;
  const isDevMode = mode === EnumBuildModes.Development;

  const config: TConfig = {
    mode,
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
    optimization: {
      minimize: true,
      minimizer: [buildMinimizer(mode)],
    },
  };

  if (isDevMode) {
    config.devtool = "source-map";
  }

  return config;
}
