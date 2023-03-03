export const enum EnumBuildModes {
  Development = "development",
  Production = "production",
}

export interface IBuildPaths {
  context: string;
  entry: string;
  build: string;
  html: string;
}

export interface IConfigBuildOptions {
  port: number;
  mode: EnumBuildModes;
  paths: IBuildPaths;
}

export interface IPluginsBuildOptions {
  mode: EnumBuildModes;
}
