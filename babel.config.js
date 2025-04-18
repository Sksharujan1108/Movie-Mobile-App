module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
        [
          "module-resolver",
          {
            root: [
              "./src",
            ],
            extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
            alias: {
              "@": "./src", 
            },
          },
          "react-native-reanimated/plugin",
        ],
      ],
  };
};
