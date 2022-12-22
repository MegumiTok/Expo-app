import { AniOne } from "@private/AniOne";
import LogoutPage from "@pages/authPage/LogoutPage";
import { AddEventPage } from "@pages/eventPage";

export const MenuList = [
  // {
  //   name: "Test",
  //   label: "Test",
  //   component: Test,
  //   options: { headerShown: false }
  // },
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
    name: "AddEventPage",
    label: "AddEventPage",
    component: AddEventPage,
    options: { headerShown: true }
  }

  // {
  //   name: "EditProfilePage",
  //   label: "EditProfilePage",
  //   component: EditProfilePage,
  //   options: { headerShown: true }
  // }

  // { name: "StickyHeader", label: "StickyHeader", component: StickyHeader },
  // {
  //   name: "EditPostPage",
  //   label: "EditPostPage",
  //   component: EditPostPage,
  //   options: { headerShown: true }
  // }
];

export default MenuList;
