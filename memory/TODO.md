# リファクタリング TODO

## 優先度: 高

- [x] 1. マジックナンバーの定数化（レイア���ト値、色、アニメーション、データ制限）
- [x] 2. 重複コード削除: searchPage 3ファイル（FavList, ProductList, SelectedGenreList）のグリッド共通化
- [x] 3. 重複コード削除: ReadContinue の footer 関数統合
- [x] 4. パフォーマンス: React.memo / useCallback 追加
- [x] 5. パフォーマンス: Profile.tsx の不要な useState + useEffect 削除

## 優先度: 中

- [x] 6. モジュール分割: GenreList.tsx のデータ部分を src/assets/data/genres.ts に移動
- [x] 7. デッドコード削除（コメントアウトされたコード、console.log）
- [x] 8. ReactionButtons.tsx 全体がコメントアウト → 削除
- [x] 9. CreatorList.tsx のインラインスタイル（shadow）を StyleSheet に移動
- [x] 10. iconAnimation.ts の重複コード（withTiming 設定）を定数化

## 未着手（低優先度・将来検討）

- [ ] 型改善（any 型の排除、型リテラル修正）
- [ ] EventLists.tsx の4コンポーネントはすでにテンプレート化済みで問題なし
- [ ] InputField / InputFieldTwo の統合（用途が異なるため現状維持でも可）
