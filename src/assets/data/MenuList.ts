import { AniOne } from "@private/AniOne";
import LogoutPage from "@pages/authPage/LogoutPage";
import { AddEventPage } from "@pages/eventPage";
import Ani_Task from "@private/Ani_Task";
import { AniFour } from "@private/AniFour";

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
  },
  {
    name: "Ani_Task",
    label: "Ani_Task",
    component: Ani_Task,
    options: { headerShown: true }
  },

  {
    name: "AniFour",
    label: "AniFour",
    component: AniFour,
    options: { headerShown: true }
  }

  // { name: "StickyHeader", label: "StickyHeader", component: StickyHeader },
  // {
  //   name: "EditPostPage",
  //   label: "EditPostPage",
  //   component: EditPostPage,
  //   options: { headerShown: true }
  // }
];

export default MenuList;
