import { MdChatBubbleOutline } from "react-icons/md";
import { BiCartAlt } from "react-icons/bi";
import { CiViewList } from "react-icons/ci";
import { ReactNode } from "react";
import { TbTag } from "react-icons/tb";
export interface ISubNavigator {
    title:string
    link:string
    segment:string
} 
export interface IMainNavigators {
  title: string
  icon: ReactNode
  link: string
  segment:string
  subNavigators?:ISubNavigator[]
}
export const mainNavigators:IMainNavigators[] = [
  {
    title:"orders",
    segment:"orders",
    icon:<BiCartAlt />,
    link:"/account/orders",
  },{
    title:"wishList",
    segment:"wishlist",
    icon:<TbTag />,
    link:"/account/wishList",
  },{
    title:"addresses",
    segment:"addresses",
    icon:<CiViewList />,
    link:"/account/addresses",
  },{
    title:"Chats",
    segment:"sellerschats",
    icon:<MdChatBubbleOutline />,
    link:"/account/sellersChats"
  }
]
