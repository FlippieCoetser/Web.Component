module.exports = function (wallaby) {
  return {
    files: [
      "importmap.js",
      "node_modules/@browser-modules/component.library/lib/**/*.js",
      "src/**/*.ts",
    ],
    tests: ["test/*.ts"],
    trace: true,
    compilers: {
      "**/*.ts": wallaby.compilers.typeScript({
        module: "es2020",
        target: "es2020",
        sourceMap: true,
        inlineSources: true,
      }),
    },
  };
};
