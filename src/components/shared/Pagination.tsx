import { ICounter } from "@/types/types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationParams {
  onLeftClick: () => void;
  onRightClick: () => void;
  counter: ICounter;
}
function Pagination({ counter, onLeftClick, onRightClick }: PaginationParams) {
  return (
    <>
      {counter.pagesLen > 1 && (
        <div className="flex justify-end p-3 c3 gap-3 mt-3 pr-10">
          <div className="flex gap-3 items-center">
            <div
              className="flex cursor-pointer gap-1 items-center"
              onClick={onLeftClick}
            >
              <FaAngleLeft />{" "}
              <div className="font-semibold hover:underline pb-1">Previous</div>
            </div>
            <ul className="flex gap-3">
              {counter.curPage <= 1 ? (
                <li></li>
              ) : (
                <li className="scale-75 transition-all">{counter.prev}</li>
              )}
              <li className="font-semibold">{counter.curPage}</li>
              {counter.curPage >= counter.pagesLen ? (
                <li></li>
              ) : (
                <li className="scale-75 transition-all">{counter.next}</li>
              )}
            </ul>
            <div
              className="flex cursor-pointer gap-1 items-center"
              onClick={onRightClick}
            >
              <div className="font-semibold hover:underline pb-1">Next</div>
              <FaAngleRight />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
