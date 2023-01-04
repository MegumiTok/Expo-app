import { AniOne } from "@private/AniOne";
import LogoutPage from "@pages/authPage/LogoutPage";
import AddEventPage from "@pages/eventPage/AddEventPage";
import Ani_Task from "@private/Ani_Task";
import { AniFour } from "@private/AniFour";
import { PraSearch } from "@private/PraSearch";
import WebShopPra from "@private/WebShopPra";
import { DropdownDemo } from "@private/Dropdown";
export const MenuList = [
  {
    name: "AniOne",
    label: "AniOne",
    component: AniOne,
    icon: "smile",
    options: { headerShown: false }
  },

  {
    name: "LogoutPage",
    label: "LogoutPage",
    component: LogoutPage,
    icon: "shield",
    options: { headerShown: true }
  },
  {
    name: "AddEventPage",
    label: "AddEventPage",
    component: AddEventPage,
    icon: "shield",
    options: { headerShown: true }
  },
  {
    name: "Ani_Task",
    label: "Ani_Task",
    component: Ani_Task,
    icon: "smile",
    options: { headerShown: true }
  },

  {
    name: "AniFour",
    label: "AniFour",
    component: AniFour,
    icon: "smile",
    options: { headerShown: true }
  },

  {
    name: "PraSearch",
    label: "PraSearch",
    component: PraSearch,
    icon: "smile",
    options: { headerShown: true }
  },
  {
    name: "WebShopPra",
    label: "WebShopPra",
    component: WebShopPra,
    icon: "smile",
    options: { headerShown: false }
  },
  {
    name: "DropdownDemo",
    label: "DropdownDemo",
    component: DropdownDemo,
    icon: "smile",
    options: { headerShown: false }
  }

  // { name: "StickyHeader", label: "StickyHeader", component: StickyHeader },
];

export default MenuList;
