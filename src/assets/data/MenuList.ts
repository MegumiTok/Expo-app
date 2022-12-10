// import { AddPostPage } from "@components/pages";

// import EditProfilePage from "@components/pages/EditProfilePage";
// import LogoutPage from "@components/pages/authPage/LogoutPage";
import Test from "@components/Test";
import { AniOne } from "@private/AniOne";
import { AniTwo } from "@private/AniTwo";
import LogoutPage from "@pages/authPage/LogoutPage";
import AddPostPage from "@pages/AddPostPage";
import TestTwo from "@private/TestTwo";

export const MenuList = [
  {
    name: "Test",
    label: "Test",
    component: Test,
    options: { headerShown: false }
  },
  {
    name: "AniOne",
    label: "AniOne",
    component: AniOne,
    options: { headerShown: false }
  },
  // {
  //   name: "AniTwo",
  //   label: "AniTwo",
  //   component: AniTwo,
  //   options: { headerShown: false }
  // }
  {
    name: "LogoutPage",
    label: "LogoutPage",
    component: LogoutPage,
    options: { headerShown: true }
  },
  {
    name: "AddPostPage",
    label: "AddPostPage",
    component: AddPostPage,
    options: { headerShown: true }
  },
  {
    name: "TestTwo",
    label: "TestTwo",
    component: TestTwo,
    options: { headerShown: true }
  }
  //   {
  //     name: "EditProfilePage",
  //     label: "EditProfilePage",
  //     component: EditProfilePage,
  //     options: { headerShown: true }
  //   }
  // { name: "StickyHeader", label: "StickyHeader", component: StickyHeader },
  // {
  //   name: "AddPostPage",
  //   label: "AddPostPage",
  //   component: AddPostPage,
  //   options: { headerShown: true },
  // },
];

export default MenuList;
