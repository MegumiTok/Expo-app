# Expo SDK 53 フルリビルド

## 生じている問題

現在のアプリは Expo SDK 47（2022年10月リリース）で構築されており、2年半分のアップデートが未適用。技術スタックの多くが非推奨・開発終了・古いバージョンのまま放置されており、段階的アップグレードよりも新規プロジェクトとして作り直す方が合理的な状態。

具体的に問題のあるスタック：

| カテゴリ | 現状 | 問題 |
|---------|------|------|
| Expo SDK | 47 | サポート切れ、6バージョン遅れ |
| UI ライブラリ | NativeBase 3.4 | **開発終了**。最も影響範囲が大きい |
| ルーティング | @react-navigation 6.x（手動定義） | Expo Router がデフォルトになった |
| 状態管理 | Redux Toolkit 1.9 | この規模のアプリには過剰 |
| スタイリング | styled-components + styled-system | React Native との相性問題が増加 |
| 画像 | react-native-fast-image | メンテナンス停滞 |
| 環境変数 | カスタム env.ts | Expo 標準（EXPO_PUBLIC_）に乗れていない |
| パッケージマネージャ | yarn v1 | 古い |

## 仮説

SDK 47 → 53 は Breaking Changes が6バージョン分累積しており、段階的アップグレードはコストが高い。新規プロジェクトを `npx create-expo-app` で作成し、既存のビジネスロジック（Firebase 連携、Redux の async thunk ロジック）を移植する方が効率的。

## やること

### Phase 1: 新規プロジェクト作成と基盤構築
- [ ] `npx create-expo-app` で SDK 53 プロジェクトを作成
- [ ] pnpm に切り替え
- [ ] TypeScript / path alias 設定
- [ ] 環境変数を `EXPO_PUBLIC_` 方式に移行
- [ ] Firebase 接続設定

### Phase 2: 技術スタック置き換え
- [ ] NativeBase → 代替 UI（gluestack-ui / Tamagui / Nativewind から選定）
- [ ] @react-navigation → Expo Router v4
- [ ] Redux Toolkit → Zustand or TanStack Query
- [ ] styled-components → Nativewind or StyleSheet
- [ ] react-native-fast-image → expo-image
- [ ] react-native-vector-icons → @expo/vector-icons

### Phase 3: 画面・ロジック移植
- [ ] 認証フロー（signup / login / logout / password reset）
- [ ] フィード画面（投稿一覧・詳細・作成・編集・削除）
- [ ] クリエイターページ
- [ ] 検索機能（ジャンル / お気に入り / プロダクト）
- [ ] イベントページ
- [ ] プロフィール編集
- [ ] メニュー画面

### Phase 4: 仕上げ
- [ ] スプラッシュスクリーン・フォント読み込み
- [ ] 動作確認（iOS / Android / Web）
- [ ] 不要な旧コード・依存の削除

## 作業ログ

### 2026-03-29

- 着手: 技術スタックの現状調査と課題の洗い出し
- 現状の全依存関係・アーキテクチャを確認し、SDK 53 への移行方針を決定
- 新規作り直しの方針でユーザーと合意
