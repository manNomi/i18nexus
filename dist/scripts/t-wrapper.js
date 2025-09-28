#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationWrapper = void 0;
exports.runTranslationWrapper = runTranslationWrapper;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const glob_1 = require("glob");
const parser = __importStar(require("@babel/parser"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
const t = __importStar(require("@babel/types"));
const DEFAULT_CONFIG = {
    sourcePattern: "src/**/*.{js,jsx,ts,tsx}",
    processKorean: true,
    processEnglish: false,
    customTextRegex: /[가-힣]/,
    translationImportSource: "react-i18next",
    generateKeys: false,
    keyPrefix: "",
    namespace: "common",
    outputDir: "./locales",
    dryRun: false,
};
class TranslationWrapper {
    constructor(config = {}) {
        this.translationKeys = new Map();
        this.config = { ...DEFAULT_CONFIG, ...config };
        // 텍스트 감지 정규식 설정
        if (this.config.processKorean && this.config.processEnglish) {
            this.config.customTextRegex = /[가-힣]|[a-zA-Z]{2,}/;
        }
        else if (this.config.processKorean) {
            this.config.customTextRegex = /[가-힣]/;
        }
        else if (this.config.processEnglish) {
            this.config.customTextRegex = /[a-zA-Z]{2,}/;
        }
    }
    generateTranslationKey(text) {
        if (!this.config.generateKeys) {
            return text;
        }
        // 간단한 키 생성: 특수문자 제거, camelCase 변환
        const key = text
            .replace(/[^a-zA-Z가-힣0-9\s]/g, "")
            .split(/\s+/)
            .filter((word) => word.length > 0)
            .map((word, index) => index === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("");
        const fullKey = this.config.keyPrefix
            ? `${this.config.keyPrefix}.${key}`
            : key;
        this.translationKeys.set(fullKey, text);
        return fullKey;
    }
    createUseTranslationHook() {
        const hookCall = this.config.namespace
            ? t.callExpression(t.identifier("useTranslation"), [
                t.stringLiteral(this.config.namespace),
            ])
            : t.callExpression(t.identifier("useTranslation"), []);
        return t.variableDeclaration("const", [
            t.variableDeclarator(t.objectPattern([
                t.objectProperty(t.identifier("t"), t.identifier("t"), false, true),
            ]), hookCall),
        ]);
    }
    shouldSkipPath(path) {
        // t() 함수로 이미 래핑된 경우 스킵
        if (t.isCallExpression(path.parent) &&
            t.isIdentifier(path.parent.callee, { name: "t" })) {
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
    processFunctionBody(path) {
        let wasModified = false;
        path.traverse({
            StringLiteral: (subPath) => {
                if (this.shouldSkipPath(subPath)) {
                    return;
                }
                if (this.config.customTextRegex.test(subPath.node.value)) {
                    wasModified = true;
                    const translationKey = this.generateTranslationKey(subPath.node.value);
                    const replacement = t.callExpression(t.identifier("t"), [
                        t.stringLiteral(translationKey),
                    ]);
                    if (t.isJSXAttribute(subPath.parent)) {
                        subPath.replaceWith(t.jsxExpressionContainer(replacement));
                    }
                    else {
                        subPath.replaceWith(replacement);
                    }
                }
            },
        });
        return wasModified;
    }
    addImportIfNeeded(ast) {
        let hasImport = false;
        (0, traverse_1.default)(ast, {
            ImportDeclaration: (path) => {
                if (path.node.source.value === this.config.translationImportSource) {
                    const hasUseTranslation = path.node.specifiers.some((spec) => t.isImportSpecifier(spec) &&
                        t.isIdentifier(spec.imported) &&
                        spec.imported.name === "useTranslation");
                    if (!hasUseTranslation) {
                        path.node.specifiers.push(t.importSpecifier(t.identifier("useTranslation"), t.identifier("useTranslation")));
                    }
                    hasImport = true;
                }
            },
        });
        if (!hasImport) {
            const importDeclaration = t.importDeclaration([
                t.importSpecifier(t.identifier("useTranslation"), t.identifier("useTranslation")),
            ], t.stringLiteral(this.config.translationImportSource));
            ast.program.body.unshift(importDeclaration);
            return true;
        }
        return false;
    }
    isReactComponent(name) {
        return /^[A-Z]/.test(name) || /^use[A-Z]/.test(name);
    }
    async processFiles() {
        const filePaths = await (0, glob_1.glob)(this.config.sourcePattern);
        const processedFiles = [];
        console.log(`� Found ${filePaths.length} files to process...`);
        for (const filePath of filePaths) {
            let isFileModified = false;
            const code = fs.readFileSync(filePath, "utf-8");
            try {
                const ast = parser.parse(code, {
                    sourceType: "module",
                    plugins: ["jsx", "typescript", "decorators-legacy"],
                });
                const modifiedComponentPaths = [];
                (0, traverse_1.default)(ast, {
                    FunctionDeclaration: (path) => {
                        const componentName = path.node.id?.name;
                        if (componentName && this.isReactComponent(componentName)) {
                            if (this.processFunctionBody(path)) {
                                isFileModified = true;
                                modifiedComponentPaths.push(path);
                            }
                        }
                    },
                    ArrowFunctionExpression: (path) => {
                        if (t.isVariableDeclarator(path.parent) &&
                            t.isIdentifier(path.parent.id)) {
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
                                    if (t.isIdentifier(path.node.callee, { name: "useTranslation" })) {
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
                        const output = (0, generator_1.default)(ast, {
                            retainLines: true,
                            compact: false,
                            jsescOption: {
                                minimal: true,
                            },
                        });
                        fs.writeFileSync(filePath, output.code, "utf-8");
                    }
                    processedFiles.push(filePath);
                    console.log(`🔧 ${filePath} - ${this.config.dryRun ? "Would be modified" : "Modified"}`);
                }
            }
            catch (error) {
                console.error(`❌ Error processing ${filePath}:`, error);
            }
        }
        return {
            processedFiles,
            translationKeys: this.translationKeys,
        };
    }
    async generateTranslationFiles(outputDir) {
        const dir = outputDir || this.config.outputDir;
        if (this.translationKeys.size === 0) {
            console.log("📝 No translation keys generated");
            return;
        }
        const translationObj = {};
        this.translationKeys.forEach((value, key) => {
            translationObj[key] = value;
        });
        if (!this.config.dryRun) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const filePath = path.join(dir, `${this.config.namespace}.json`);
            fs.writeFileSync(filePath, JSON.stringify(translationObj, null, 2), "utf-8");
        }
        console.log(`📝 ${this.config.dryRun ? "Would generate" : "Generated"} translation file: ${path.join(dir, `${this.config.namespace}.json`)}`);
        console.log(`🔑 ${this.config.dryRun ? "Would generate" : "Generated"} ${this.translationKeys.size} translation keys`);
    }
}
exports.TranslationWrapper = TranslationWrapper;
async function runTranslationWrapper(config = {}) {
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
    const config = {};
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
//# sourceMappingURL=t-wrapper.js.map