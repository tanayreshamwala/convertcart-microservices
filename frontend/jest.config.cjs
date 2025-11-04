module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|@mui|@babel)/)", // ✅ force Jest to transpile MUI + axios
  ],
  moduleFileExtensions: ["js", "jsx"],
  roots: ["<rootDir>/tests"],
};
