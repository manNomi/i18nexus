import generator from "@babel/generator";
import * as parser from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import * as fs from "fs";
import { glob } from "glob";

const koreanRegex = /[가-힣]/;

// 함수/컴포넌트 내부를 순회하며 수정이 일어났는지 여부를 반환하는 함수
const processFunctionBody = (path: NodePath<t.Function>): boolean => {
  let wasModified = false;
  path.traverse({
    StringLiteral(subPath) {
      if (
        t.isCallExpression(subPath.parent) &&
        t.isIdentifier(subPath.parent.callee, { name: "t" })
      ) {
        return;
      }

      if (koreanRegex.test(subPath.node.value)) {
        wasModified = true;
        const replacement = t.callExpression(t.identifier("t"), [
          t.stringLiteral(subPath.node.value),
        ]);

        if (t.isJSXAttribute(subPath.parent)) {
          subPath.replaceWith(t.jsxExpressionContainer(replacement));
        } else {
          subPath.replaceWith(replacement);
        }
        subPath.skip();
      }
    },
    JSXText(subPath) {
      const trimmedValue = subPath.node.value.trim();
      if (trimmedValue && koreanRegex.test(trimmedValue)) {
        wasModified = true;
        subPath.replaceWith(
          t.jsxExpressionContainer(
            t.callExpression(t.identifier("t"), [t.stringLiteral(trimmedValue)])
          )
        );
        subPath.skip();
      }
    },
  });
  return wasModified;
};

// useTranslation 훅을 생성하는 함수
const createUseTranslationHook = () => {
  const hookDeclaration = t.variableDeclaration("const", [
    t.variableDeclarator(
      t.objectPattern([
        t.objectProperty(t.identifier("t"), t.identifier("t"), false, true),
      ]),
      t.callExpression(t.identifier("useTranslation"), [])
    ),
  ]);

  hookDeclaration.trailingComments = [{ type: "CommentLine", value: "" }];

  return hookDeclaration;
};

async function run() {
  // 1. glob으로 모든 파일 배열로 만들어서 반환
  const filePaths = await glob("src/**/*.{js,jsx,ts,tsx}");

  // 2. 각 파일을 순회 ast로 쪼개서
  for (const filePath of filePaths) {
    let isFileModified = false;
    const code = fs.readFileSync(filePath, "utf-8");
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    const modifiedComponentPaths: NodePath<t.Function>[] = [];

    traverse(ast, {
      // 함수 탐색
      FunctionDeclaration(path) {
        const componentName = path.node.id?.name;
        if (
          componentName &&
          (/^[A-Z]/.test(componentName) || /^use/.test(componentName))
        ) {
          if (processFunctionBody(path)) {
            isFileModified = true;
            modifiedComponentPaths.push(path);
          }
        }
      },
      // 화살표 함수 탐색
      ArrowFunctionExpression(path) {
        if (
          t.isVariableDeclarator(path.parent) &&
          t.isIdentifier(path.parent.id)
        ) {
          const componentName = path.parent.id.name;
          if (
            componentName &&
            (/^[A-Z]/.test(componentName) || /^use/.test(componentName))
          ) {
            if (processFunctionBody(path)) {
              isFileModified = true;
              modifiedComponentPaths.push(path);
            }
          }
        }
      },
    });

    if (isFileModified) {
      let wasHookAdded = false;

      modifiedComponentPaths.forEach((componentPath) => {
        if (componentPath.scope.hasBinding("t")) {
          return;
        }

        const body = componentPath.get("body");
        if (body.isBlockStatement()) {
          let hasHook = false;
          body.traverse({
            CallExpression(path) {
              if (
                t.isIdentifier(path.node.callee, { name: "useTranslation" })
              ) {
                hasHook = true;
              }
            },
          });

          if (!hasHook) {
            body.unshiftContainer("body", createUseTranslationHook());
            // ✨ FIX: 훅이 실제로 추가되었으므로 플래그를 true로 설정
            wasHookAdded = true;
          }
        }
      });

      let hasImport = false;
      traverse(ast, {
        ImportDeclaration(path) {
          if (path.node.source.value === "i18nexus") {
            hasImport = true;
          }
        },
      });

      // ✨ FIX: 훅이 실제로 추가된 경우에만 import 구문을 추가하도록 조건 변경
      if (wasHookAdded && !hasImport) {
        const importDeclaration = t.importDeclaration(
          [
            t.importSpecifier(
              t.identifier("useTranslation"),
              t.identifier("useTranslation")
            ),
          ],
          t.stringLiteral("i18nexus")
        );
        importDeclaration.trailingComments = [
          { type: "CommentLine", value: "" },
        ];
        ast.program.body.unshift(importDeclaration);
      }

      const output = generator(ast, {
        retainLines: true,
        jsescOption: {
          minimal: true,
        },
      });
      fs.writeFileSync(filePath, output.code, "utf-8");
      console.log(`🔧 ${filePath} 파일이 수정되었습니다.`);
    }
  }
}

run();
console.log("✅ 스크립트 실행이 완료되었습니다. 변경 사항을 확인해 주세요.");
