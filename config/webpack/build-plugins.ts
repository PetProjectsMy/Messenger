import CircularDependencyPlugin from "circular-dependency-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ProgressPlugin, type WebpackPluginInstance } from "webpack";
import { EnumBuildModes, IPluginsBuildOptions } from "./types/config";

function buildHTMLPlugin(isDevMode: boolean) {
  return new HTMLWebpackPlugin({
    template: "index.html",
    favicon: "assets/favicon.ico",
    minify: { collapseWhitespace: isDevMode },
  });
}

function buildCSSExtractPlugin(isDevMode: boolean) {
  return new MiniCssExtractPlugin({
    filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
  });
}

const circularDependencyPlugin = new CircularDependencyPlugin();

const buildingProgressPlugin = new ProgressPlugin();

export function buildPlugins(
  options: IPluginsBuildOptions
): WebpackPluginInstance[] {
  const { mode } = options;
  const isDevMode = mode === EnumBuildModes.Development;

  return [
    buildHTMLPlugin(isDevMode),
    buildCSSExtractPlugin(isDevMode),
    circularDependencyPlugin,
    buildingProgressPlugin,
  ];
}
