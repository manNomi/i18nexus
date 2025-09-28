#!/usr/bin/env node

// Pre-publish validation script
const fs = require("fs");
const path = require("path");

console.log("🔍 Running pre-publish validation...");

const checks = [
  {
    name: "Package.json exists",
    check: () => fs.existsSync("package.json"),
  },
  {
    name: "README.md exists",
    check: () => fs.existsSync("README.md"),
  },
  {
    name: "LICENSE exists",
    check: () => fs.existsSync("LICENSE"),
  },
  {
    name: "Dist directory exists",
    check: () => fs.existsSync("dist"),
  },
  {
    name: "Main entry file exists",
    check: () => fs.existsSync("dist/index.js"),
  },
  {
    name: "Type definitions exist",
    check: () => fs.existsSync("dist/index.d.ts"),
  },
  {
    name: "Components directory exists",
    check: () => fs.existsSync("dist/components"),
  },
  {
    name: "Hooks directory exists",
    check: () => fs.existsSync("dist/hooks"),
  },
  {
    name: "Utils directory exists",
    check: () => fs.existsSync("dist/utils"),
  },
];

let allPassed = true;

checks.forEach(({ name, check }) => {
  const passed = check();
  console.log(`${passed ? "✅" : "❌"} ${name}`);
  if (!passed) allPassed = false;
});

if (allPassed) {
  console.log("\n🎉 All validation checks passed!");
  console.log("📦 Package is ready for publishing");
  process.exit(0);
} else {
  console.log("\n💥 Some validation checks failed!");
  console.log("🔧 Please fix the issues before publishing");
  process.exit(1);
}
