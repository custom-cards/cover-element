import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/cover-element.js",
  output: {
    file: "dist/cover-element-bundle.js",
    format: "umd",
    name: "GroupElement",
  },
  plugins: [resolve()],
};
