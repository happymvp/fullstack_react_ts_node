import eslint from "@eslint/js";
import reactPlugin from 'eslint-plugin-react'
import tsParser from "@typescript-eslint/parser";
import constCasePlugin from "eslint-plugin-const-case";
import * as dependPlugin from "eslint-plugin-depend";
import a11yJsxPlugin from "eslint-plugin-jsx-a11y";
import noLoopsPlugin from "eslint-plugin-no-loops";
import onlyErrorsPlugin from "eslint-plugin-only-error";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import eslintPrettierPlugin from "eslint-plugin-prettier/recommended";
import promisePlugin from "eslint-plugin-promise";
import reactHookPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import a11yStyledPlugin from "eslint-plugin-styled-components-a11y";
import commentsPlugin from "eslint-plugin-write-good-comments";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    dependPlugin.configs["flat/recommended"],
    sonarjsPlugin.configs.recommended,
    eslintPrettierPlugin,
    a11yStyledPlugin.flatConfigs.strict,
    a11yJsxPlugin.flatConfigs.strict,
    promisePlugin.configs["flat/recommended"],
    perfectionistPlugin.configs["recommended-natural"],
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            ecmaVersion: 2024,
            globals: {...globals.builtin, ...globals.browser, ...globals.es2024},
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                projectService: true,
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            sourceType: "module",
        },
        name: "happymvp/recommended",
        plugins: {
            "const-case": constCasePlugin,
            "no-loops": noLoopsPlugin,
            "only-error": onlyErrorsPlugin,
            "react-hooks": reactHookPlugin,
            "react-refresh": reactRefreshPlugin,
            "write-good-comments": commentsPlugin,
            "react": reactPlugin,
        },
        rules: {
            "const-case/uppercase": 0,
            "no-loops/no-loops": 2,
            "react-refresh/only-export-components": 2,
            "sonarjs/mouse-events-a11y": 0,
            "sonarjs/no-empty-function": 0,
            "sonarjs/no-unused-expressions": 0,
            "sonarjs/unused-import": 0,
            "sonarjs/no-redeclare": 0, // TS interfaces can have same name as function
            "sonarjs/todo-tag": 1,
            "sonarjs/function-return-type": 0,
            "write-good-comments/write-good-comments": [
                2,
                {
                    adverb: true,
                    cliches: true,
                    eprime: true,
                    illusion: true,
                    passive: true,
                    so: true,
                    thereIs: true,
                    tooWordy: true,
                    weasel: true,
                    whitelist: ["example-word"],
                },
            ],
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
        },

        settings: {
            react: {version: '18.3'},
            // To enable your custom component's check as DOM elements,
            // you can set global settings in your configuration file by mapping each custom component name
            // to a DOM element type.
            "jsx-a11y": {
                components: {
                    CityInput: "input",
                    CustomButton: "button",
                    MyButton: "button",
                    RoundButton: "button",
                },
            },
        },
    },
    {
        ignores: ['**/components/ui/*','**/hooks/use-toast.tsx','**/*.js', '**/*.config.js', ".next/**", "dist/**", "node_modules/**", "bin/**", "build/**"],
    },
];
