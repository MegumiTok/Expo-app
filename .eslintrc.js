module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // Remember, "rules" always “wins” over "extends"
    // 順番は大事なので下手に変えないように
    // 共有設定間で設定ルールの値が衝突したら、後に記述されたものが先に記述されたものを 上書きする
    // pluginsと両方記述することで機能する

    "plugin:react/recommended",
    // 'standard-with-typescript',

    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier" //prettier　は一番最後に書く
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json", //追加
    sourceType: "module",
    ecmaFeatures: {
      //追加
      jsx: true
    }
  },
  plugins: ["@typescript-eslint", "import", "jsx-a11y", "react", "react-hooks"],
  root: true,
  settings: {
    //追加
    react: {
      version: "detect"
    }
  },
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true
      }
    ],

    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // "@typescript-eslint/ban-ts-comment": 2,
    // "@typescript-eslint/no-explicit-any": 0, //あとで２にするべき
    "@typescript-eslint/explicit-module-boundary-types": 0, // exportする関数の返り値の型の明記
    "@typescript-eslint/consistent-type-imports": 2, // importするときtypeと書くことが強制され可読性が上がる
    "@typescript-eslint/no-var-requires": 0, // 👧require使うために足してみた
    "@typescript-eslint/no-unused-vars": [
      // インポートの際のファイル拡張子を記述するかを定義するルール。
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "_",
        ignoreRestSiblings: false,
        varsIgnorePattern: "_"
      }
    ],
    //reduxのチュートリアルを参考に追記
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
    "import/extensions": [
      // .js、.jsx、.ts、.tsx のファイルのみ拡張子を省略し、他のファイルは拡張子を記述させるように設定
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never"
      }
    ],
    "react/jsx-filename-extension": [
      // JSX のファイル拡張子を制限するルール。eslint-config-airbnb で .jsx のみに限定されているので、.tsx を追加
      "error",
      {
        extensions: [".jsx", ".tsx"]
      }
    ],
    "react/react-in-jsx-scope": "off", // JSX 記述を使用する場合に react モジュールを React としてインポートすることを強制する。新しい JSX 変換形式を用いる場合はインポートが不要になるためこの設定を無効化
    // "react-native/no-unused-styles": 2, // 未使用のstyleを検知
    // "react-native/split-platform-components": 2, //スタイルシートに関するカスタマイズ
    "react-native/no-inline-styles": 0, // スタイルシートに関するカスタマイズ
    "react-native/no-color-literals": 0, // スタイルシートに関するカスタマイズ
    // "react-native/no-raw-text": 0, //スタイルシートに関するカスタマイズ
    // "import/no-extraneous-dependencies": 2,
    "import/no-duplicates": 2,
    "import/no-cycle": 0,
    "import/prefer-default-export": 0,
    "import/named": 0,
    "import/namespace": 0,
    "import/default": 0,
    "import/no-named-as-default-member": 0,
    "import/no-named-as-default": 0,
    "import/no-unused-modules": 0,
    "import/no-deprecated": 0,
    "comma-dangle": 0
  }
};
