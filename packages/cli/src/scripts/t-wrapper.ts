#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";
import * as parser from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";

export interface ScriptConfig {
  sourcePattern?: string;
  processKorean?: boolean;
  processEnglish?: boolean;
  customTextRegex?: RegExp;
  translationImportSource?: string;
  generateKeys?: boolean;
  keyPrefix?: string;
  namespace?: string;
  outputDir?: string;
  dryRun?: boolean;
}

const DEFAULT_CONFIG: Required<ScriptConfig> = {
  sourcePattern: "src/**/*.{js,jsx,ts,tsx}",
  processKorean: true,
  processEnglish: false,
  customTextRegex: /[가-힣]/,
  translationImportSource: "i18nexus-core", // useTranslation을 기본으로
  generateKeys: true, // 키 생성을 기본으로 활성화
  keyPrefix: "",
  namespace: "common",
  outputDir: "./locales",
  dryRun: false,
};

export class TranslationWrapper {
  private config: Required<ScriptConfig>;
  private translationKeys: Map<string, string> = new Map();

  constructor(config: Partial<ScriptConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };

    // 텍스트 감지 정규식 설정
    if (this.config.processKorean && this.config.processEnglish) {
      this.config.customTextRegex = /[가-힣]|[a-zA-Z]{2,}/;
    } else if (this.config.processKorean) {
      this.config.customTextRegex = /[가-힣]/;
    } else if (this.config.processEnglish) {
      this.config.customTextRegex = /[a-zA-Z]{2,}/;
    }
  }

  private generateTranslationKey(text: string): string {
    if (!this.config.generateKeys) {
      return text;
    }

    // 띄어쓰기를 포함한 키 생성: 한국어 텍스트의 띄어쓰기를 그대로 유지
    const key = text
      .replace(/[^a-zA-Z가-힣0-9\s]/g, "") // 특수문자 제거 (띄어쓰기 유지)
      .trim() // 앞뒤 공백 제거
      .replace(/\s+/g, " ") // 연속된 공백을 하나의 공백으로 정리
      .toLowerCase(); // 소문자로 변환

    const fullKey = this.config.keyPrefix
      ? `${this.config.keyPrefix}.${key}`
      : key;
    this.translationKeys.set(fullKey, text);
    return fullKey;
  }

  private createUseTranslationHook(): t.VariableDeclaration {
    const hookCall = this.config.namespace
      ? t.callExpression(t.identifier("useTranslation"), [
          t.stringLiteral(this.config.namespace),
        ])
      : t.callExpression(t.identifier("useTranslation"), [
          t.stringLiteral(""), // 빈 문자열을 기본 파라미터로 설정
        ]);

    return t.variableDeclaration("const", [
      t.variableDeclarator(
        t.objectPattern([
          t.objectProperty(t.identifier("t"), t.identifier("t"), false, true),
        ]),
        hookCall
      ),
    ]);
  }

  private shouldSkipPath(path: NodePath<t.StringLiteral>): boolean {
    // t() 함수로 이미 래핑된 경우 스킵
    if (
      t.isCallExpression(path.parent) &&
      t.isIdentifier(path.parent.callee, { name: "t" })
    ) {
      return true;
    }

    // import 구문은 스킵
    const importParent = path.findParent((p) => t.isImportDeclaration(p.node));
    if (importParent?.node && t.isImportDeclaration(importParent.node)) {
      return true;
    }

    // 객체 프로퍼티 키는 스킵
    if (t.isObjectProperty(path.parent) && path.parent.key === path.node) {
      return true;
    }

    return false;
  }

  private processFunctionBody(path: NodePath<t.Function>): boolean {
    let wasModified = false;

    path.traverse({
      StringLiteral: (subPath) => {
        console.log(
          `Found string: "${
            subPath.node.value
          }", matches regex: ${this.config.customTextRegex.test(
            subPath.node.value
          )}`
        );
        if (this.shouldSkipPath(subPath)) {
          console.log(`Skipping string: "${subPath.node.value}"`);
          return;
        }

        if (this.config.customTextRegex.test(subPath.node.value)) {
          console.log(`Processing string: "${subPath.node.value}"`);
          wasModified = true;
          const translationKey = this.generateTranslationKey(
            subPath.node.value
          );
          const replacement = t.callExpression(t.identifier("t"), [
            t.stringLiteral(translationKey),
          ]);

          if (t.isJSXAttribute(subPath.parent)) {
            subPath.replaceWith(t.jsxExpressionContainer(replacement));
          } else {
            subPath.replaceWith(replacement);
          }
        }
      },
      JSXText: (subPath) => {
        const trimmedValue = subPath.node.value.trim();
        console.log(
          `Found JSX text: "${trimmedValue}", matches regex: ${
            trimmedValue && this.config.customTextRegex.test(trimmedValue)
          }`
        );
        if (trimmedValue && this.config.customTextRegex.test(trimmedValue)) {
          console.log(`Processing JSX text: "${trimmedValue}"`);
          wasModified = true;
          const translationKey = this.generateTranslationKey(trimmedValue);
          subPath.replaceWith(
            t.jsxExpressionContainer(
              t.callExpression(t.identifier("t"), [
                t.stringLiteral(translationKey),
              ])
            )
          );
        }
      },
    });
    return wasModified;
  }

  private addImportIfNeeded(ast: t.File): boolean {
    let hasImport = false;

    traverse(ast, {
      ImportDeclaration: (path) => {
        if (path.node.source.value === this.config.translationImportSource) {
          const hasUseTranslation = path.node.specifiers.some(
            (spec) =>
              t.isImportSpecifier(spec) &&
              t.isIdentifier(spec.imported) &&
              spec.imported.name === "useTranslation"
          );

          if (!hasUseTranslation) {
            path.node.specifiers.push(
              t.importSpecifier(
                t.identifier("useTranslation"),
                t.identifier("useTranslation")
              )
            );
          }
          hasImport = true;
        }
      },
    });

    if (!hasImport) {
      const importDeclaration = t.importDeclaration(
        [
          t.importSpecifier(
            t.identifier("useTranslation"),
            t.identifier("useTranslation")
          ),
        ],
        t.stringLiteral(this.config.translationImportSource)
      );
      ast.program.body.unshift(importDeclaration);
      return true;
    }

    return false;
  }

  private isReactComponent(name: string): boolean {
    return /^[A-Z]/.test(name) || /^use[A-Z]/.test(name);
  }

  public async processFiles(): Promise<{
    processedFiles: string[];
    translationKeys: Map<string, string>;
  }> {
    const filePaths = await glob(this.config.sourcePattern);
    const processedFiles: string[] = [];

    console.log(`� Found ${filePaths.length} files to process...`);

    for (const filePath of filePaths) {
      let isFileModified = false;
      const code = fs.readFileSync(filePath, "utf-8");

      try {
        const ast = parser.parse(code, {
          sourceType: "module",
          plugins: ["jsx", "typescript", "decorators-legacy"],
        });

        const modifiedComponentPaths: NodePath<t.Function>[] = [];

        traverse(ast, {
          FunctionDeclaration: (path) => {
            const componentName = path.node.id?.name;
            console.log(
              `Found function: ${componentName}, isReactComponent: ${
                componentName && this.isReactComponent(componentName)
              }`
            );
            if (componentName && this.isReactComponent(componentName)) {
              if (this.processFunctionBody(path)) {
                console.log(`Modified function: ${componentName}`);
                isFileModified = true;
                modifiedComponentPaths.push(path);
              }
            }
          },
          ArrowFunctionExpression: (path) => {
            if (
              t.isVariableDeclarator(path.parent) &&
              t.isIdentifier(path.parent.id)
            ) {
              const componentName = path.parent.id.name;
              if (componentName && this.isReactComponent(componentName)) {
                if (this.processFunctionBody(path)) {
                  isFileModified = true;
                  modifiedComponentPaths.push(path);
                }
              }
            }
          },
        });

        if (isFileModified) {
          let wasHookAdded = false;

          // 수정된 컴포넌트에 useTranslation 훅 추가
          modifiedComponentPaths.forEach((componentPath) => {
            if (componentPath.scope.hasBinding("t")) {
              return;
            }

            const body = componentPath.get("body");
            if (body.isBlockStatement()) {
              let hasHook = false;
              body.traverse({
                CallExpression: (path) => {
                  if (
                    t.isIdentifier(path.node.callee, { name: "useTranslation" })
                  ) {
                    hasHook = true;
                  }
                },
              });

              if (!hasHook) {
                body.unshiftContainer("body", this.createUseTranslationHook());
                wasHookAdded = true;
              }
            }
          });

          // 필요한 경우 import 추가
          if (wasHookAdded) {
            this.addImportIfNeeded(ast);
          }

          if (!this.config.dryRun) {
            const output = generate(ast, {
              retainLines: true,
              compact: false,
              jsescOption: {
                minimal: true,
              },
            });

            fs.writeFileSync(filePath, output.code, "utf-8");
          }

          processedFiles.push(filePath);
          console.log(
            `🔧 ${filePath} - ${
              this.config.dryRun ? "Would be modified" : "Modified"
            }`
          );
        }
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error);
      }
    }

    return {
      processedFiles,
      translationKeys: this.translationKeys,
    };
  }

  public async generateTranslationFiles(outputDir?: string): Promise<void> {
    const dir = outputDir || this.config.outputDir;

    if (this.translationKeys.size === 0) {
      console.log("📝 No translation keys generated");
      return;
    }

    const translationObj: Record<string, string> = {};
    this.translationKeys.forEach((value, key) => {
      translationObj[key] = value;
    });

    if (!this.config.dryRun) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const filePath = path.join(dir, `${this.config.namespace}.json`);
      fs.writeFileSync(
        filePath,
        JSON.stringify(translationObj, null, 2),
        "utf-8"
      );
    }

    console.log(
      `📝 ${
        this.config.dryRun ? "Would generate" : "Generated"
      } translation file: ${path.join(dir, `${this.config.namespace}.json`)}`
    );
    console.log(
      `🔑 ${this.config.dryRun ? "Would generate" : "Generated"} ${
        this.translationKeys.size
      } translation keys`
    );
  }
}

export async function runTranslationWrapper(
  config: Partial<ScriptConfig> = {}
) {
  const wrapper = new TranslationWrapper(config);

  console.log("🚀 Starting translation wrapper...");
  const startTime = Date.now();

  const { processedFiles, translationKeys } = await wrapper.processFiles();

  if (config.generateKeys && translationKeys.size > 0) {
    await wrapper.generateTranslationFiles();
  }

  const endTime = Date.now();
  console.log(`\n✅ Translation wrapper completed in ${endTime - startTime}ms`);
  console.log(`📊 Processed ${processedFiles.length} files`);

  if (translationKeys.size > 0) {
    console.log(`🔑 Generated ${translationKeys.size} translation keys`);
  }
}

// CLI 실행 부분
if (require.main === module) {
  const args = process.argv.slice(2);
  const config: Partial<ScriptConfig> = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--pattern":
      case "-p":
        config.sourcePattern = args[++i];
        break;
      case "--generate-keys":
      case "-g":
        config.generateKeys = true;
        break;
      case "--namespace":
      case "-n":
        config.namespace = args[++i];
        break;
      case "--english":
      case "-e":
        config.processEnglish = true;
        break;
      case "--key-prefix":
        config.keyPrefix = args[++i];
        break;
      case "--output-dir":
      case "-o":
        config.outputDir = args[++i];
        break;
      case "--dry-run":
      case "-d":
        config.dryRun = true;
        break;
      case "--help":
      case "-h":
        console.log(`
Usage: t-wrapper [options]

Options:
  -p, --pattern <pattern>    Source file pattern (default: "src/**/*.{js,jsx,ts,tsx}")
  -g, --generate-keys        Generate translation keys automatically
  -n, --namespace <ns>       Translation namespace (default: "common")
  -e, --english             Process English text too
  --key-prefix <prefix>      Prefix for generated keys
  -o, --output-dir <dir>     Output directory for translation files (default: "./locales")
  -d, --dry-run             Preview changes without modifying files
  -h, --help                Show this help message

Examples:
  t-wrapper
  t-wrapper -p "app/**/*.tsx" -g -n "components"
  t-wrapper --generate-keys --english --dry-run
  t-wrapper -g -n "common" -o "./translations"
        `);
        process.exit(0);
        break;
    }
  }

  runTranslationWrapper(config).catch(console.error);
}
