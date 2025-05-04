import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Scrollbar from "react-scrollbars-custom";
interface IDraggableScroll extends PropsWithChildren {
  className?: string;
}
const CustomScroll = ({ className, children }: IDraggableScroll) => {
  return <Scrollbar>{children}</Scrollbar>;
};

export default CustomScroll;
