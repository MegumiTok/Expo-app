import * as ImagePicker from "expo-image-picker";
//firebase------------------------------------------------------------------------------
import { storage } from "src/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "react-native-get-random-values";
// import { nanoid } from "nanoid";

// export async function pickImage() {
//   const result = ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.All,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 0.0,
//   });

//   return result;
// }

export async function askLibraryPermission() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  return status;
}

export async function uploadImage(uri, path, fName) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  //Storageに画像を保存するための処理
  //撮影された（ローカルの）写真を取得
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => resolve(xhr.response);
    xhr.onerror = () => reject(new TypeError("Network request failed"));
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  // const fileName = fName || nanoid();
  const fileName = fName;

  const imageRef = ref(storage, `${path}/${fileName}.jpeg`);
  //Storageに画像を保存
  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: "image/jpeg"
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);

  return { url, fileName };
}
