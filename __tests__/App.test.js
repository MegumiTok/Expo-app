import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import App from "../App.tsx"; //__tests__フォルダが近くにあったら階層が深くならないので見やすい(参考: Structure your tests)

// Note: test renderer must be required after react-native.

it("renders correctly", () => {
  renderer.create(<App />);
});
