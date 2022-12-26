![Screenshot](src/assets/readme/demo.gif)

## main
![demo_1](src/assets//readme/demo_1.png)
![demo_10](src/assets//readme/demo_10.png)
![demo_7](src/assets//readme/demo_7.png)
![demo_11](src/assets//readme/demo_11.png)
![demo_12](src/assets//readme/demo_12.png)
![demo_13](src/assets//readme/demo_13.png)

## Edit/Remove
![demo_3](src/assets//readme/demo_3.png)
![demo_2](src/assets//readme/demo_2.png)
![demo_5](src/assets//readme/demo_5.png)

## Sign up/in
![demo_4](src/assets//readme/demo_4.png)
![demo_14](src/assets//readme/demo_14.png)

## Create
![demo_6](src/assets//readme/demo_6.png)
![demo_8](src/assets//readme/demo_8.png)

# 主な使用技術

- NativeBase 
- TypeScript 
- Expo 
- firebase
- Redux

| 使用技術 | version |
| --- | --- |
| NativeBase| 3.4.0| 
| Expo| 47.0.0| 
| firebase |9.14.0| 
| react-redux |8.0.5| 


# コミットメッセージ
| 記号 | Description | 
| --- | --- |
| :white_check_mark:| 小さな修正など完了、特にエラーなし|
| :wrench: | 修正中/作業中 | 
| :tada: | 大きめの修正完了 | 


# コメント
高さに問題がある時もしかすると以下の出力結果が0になっているかもしれません。
```js
console.log(Constants.statusBarHeight);
```
その場合はreloadしてください。

# ブランチ
## main
メインブランチ

## dev
作業中ブランチ

## v1
NativeBase docsから作られたアプリにeslintとprettierを加えただけのスッピンの状態

## v2
デザイン部分完了　(firebase、Redux追加前)

## v3
firebaseのAuthentication部分を実装（SignupPage、LogoutPage、LoginPage）

## v3.1
引き続きfirebaseでの実装(途中まで)。
すべてをfirebaseベースで実装しようと思いましたがReduxで管理をしたくなったので途中でv4に切り替えてます。
また随時v3ブランチに戻ってfirebaseでの実装をすすめようかな、と思います。

## v4
Redux と firebase と useContext で実装している。
- SearchPageは保留

## v4.1
- Delete機能追加
- Reload機能追加

## v5　(予定)
Redux + firebase (useContext なし）で実装