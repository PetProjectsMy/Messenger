import path from "path";

const rootRelativePath = "../..";

const resolvedPathFromRoot = (pathName: string) =>
  path.resolve(__dirname, rootRelativePath, pathName);

const resolvedPathFromSrc = (pathName: string) =>
  resolvedPathFromRoot(`src/${pathName}`);

export function buildResolvers() {
  return {
    extensions: [".ts", ".js"],
    alias: {
      src: resolvedPathFromRoot("src"),
      api: resolvedPathFromSrc("api"),
      assets: resolvedPathFromSrc("assets"),
      components: resolvedPathFromSrc("components"),
      core: resolvedPathFromSrc("core"),
      hocs: resolvedPathFromSrc("hocs"),
      pages: resolvedPathFromSrc("pages"),
      services: resolvedPathFromSrc("services"),
      styles: resolvedPathFromSrc("styles"),
      typings: resolvedPathFromSrc("typings"),
      utils: resolvedPathFromSrc("utils"),
      handlebars: resolvedPathFromRoot(
        "node_modules/handlebars/dist/handlebars.js"
      ),
    },
  };
}
