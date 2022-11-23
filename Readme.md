# NativeBase TypeScript Expo Template

The official NativeBase TypeScript template for [Expo](https://docs.expo.io/)

# コミットメッセージ
| 記号 | Description | 
| --- | --- |
| :white_check_mark:| 小さな修正など完了、特にエラーなし|
| :wrench: | 修正中/作業中 | 
| :tada: | 大きめの修正完了 | 

# 便利コマンド

expo-cliを使用
```sh
expo start
expo start -c　//キャッシュをクリアしてくれる
```
treeコマンド
```sh
tree -I node_modules -d 　//ファイルを除いてディレクトリだけtree表示
```
Git
```sh
git branch　//ローカルブランチの一覧を表示する。
git branch -a // --allオプション
git status
git log --oneline --all --graph --decorate  //いい感じのログが見れて便利
git branch -d <ブランチ名>　//--deleteオプション  指定したブランチを削除する ※大文字、小文字区別
git checkout feature　//Switching Branches
git checkout -b <ブランチ名> //新しいブランチを作って同時に切り替えてくれる
```
その他
```sh
console.log(typeof(something))　//ダンさんが教えてくれた望遠鏡
watchman watch-del-all && rm -rf node_modules/ && yarn cache clean && yarn install && yarn start -- --reset-cache
```
# コメント
高さに問題がある時もしかすると以下の出力結果が0になっているかもしれません。
```js
console.log(Constants.statusBarHeight);
```
その場合はreloadしてください。

# main
メインブランチ

# dev
作業中ブランチ

# v1
NativeBase docsから作られたアプリにeslintとprettierを加えただけのスッピンの状態