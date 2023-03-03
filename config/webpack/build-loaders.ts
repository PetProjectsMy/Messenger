import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { type RuleSetRule } from "webpack";

export function buildLoaders(): RuleSetRule[] {
  return [
    {
      test: /\.(jsx?|tsx?)$/,
      use: [
        {
          loader: "babel-loader",
        },
      ],
      exclude: /(node_modules)|(build)/,
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        "css-loader",
        "less-loader",
      ],
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/,
      type: "asset/resource",
    },
  ];
}
