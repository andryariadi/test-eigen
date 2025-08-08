import type { Config } from "@jest/types";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path ke root Next.js
});

const customJestConfig: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Handle alias TypeScript (jika ada)
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svgMock.tsx",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.jest.json", // Konfig khusus untuk testing
    },
  },
};

export default createJestConfig(customJestConfig);
