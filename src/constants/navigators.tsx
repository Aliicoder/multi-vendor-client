import { PiChatsCircle } from "react-icons/pi";
import { BiCartAlt } from "react-icons/bi";
import { ReactNode } from "react";
import { TbTag } from "react-icons/tb";
import { MdOutlineAddLocationAlt } from "react-icons/md";
export interface ISubNavigator {
  title: string;
  link: string;
  segment: string;
}
export interface IMainNavigators {
  title: string;
  icon: ReactNode;
  link: string;
  segment: string;
  subNavigators?: ISubNavigator[];
}
export const mainNavigators: IMainNavigators[] = [
  {
    title: "orders",
    segment: "orders",
    icon: <BiCartAlt />,
    link: "/account/orders",
  },
  {
    title: "wishList",
    segment: "wishlist",
    icon: <TbTag />,
    link: "/account/wishList",
  },
  {
    title: "Locations",
    segment: "addresses",
    icon: <MdOutlineAddLocationAlt />,
    link: "/account/addresses",
  },
  {
    title: "Merchants",
    segment: "merchants",
    icon: <PiChatsCircle />,
    link: "/account/merchants",
  },
];
