import { useGetPaginatedCategoriesQQuery } from "@/store/apiSlices/categorySlice";
import { ICategory } from "@/types/types";
import { useNavigate } from "react-router-dom";
import DraggableScroll from "@/components/scroll/DraggableScroll";

function CategoriesNav() {
  const { data: response } = useGetPaginatedCategoriesQQuery({ level: 1 });
  const navigate = useNavigate();
  return (
    <div className="flex bg-white border-b border-neutral-100 mb-3">
      <DraggableScroll className="gap-6 mx-auto pb-6">
        {response?.categories &&
          response?.categories.map((category: ICategory) => (
            <div
              className="p-2 shrink-0"
              key={category._id}
              onClick={() =>
                navigate(`categories/${category.name}`, {
                  state: { category: category.name },
                })
              }
            >
              <h1
                className="c6 grow text-center  line-clamp-1
            md:c3"
              >
                {category.name}
              </h1>
            </div>
          ))}
      </DraggableScroll>
    </div>
  );
}

export default CategoriesNav;

{
  /* <div 
ref = { (el) => (wrappersRefs.current[i] = el) }
className="flex border justify-center rounded-full aspect-square basis-3/12 items-center overflow-hidden">
<img  
  ref={ (el) => (imagesRefs.current[i] = el) }
  className=""
  src={category.media.url} 
  alt={category.name}  
  onLoad={()=>resizeImage(imagesRefs.current[i]!,wrappersRefs.current[i]!)}
  />
</div> */
}

// const resizeImage = (curImage:HTMLDivElement,curWrapper:HTMLDivElement) =>{
//   if(curImage && curWrapper){
//     const imgHeight = curImage.offsetHeight;
//     const containerHeight = curWrapper.offsetHeight;
//     if (imgHeight > containerHeight) {
//       curImage.classList.add('w-full');
//       curImage.classList.remove('h-full');
//     } else {
//       curImage.classList.add('h-full');
//       curImage.classList.remove('w-full');
//     }
//   }
// }

// const imagesRefs = useRef<(HTMLDivElement|null)[]>([])
// const wrappersRefs = useRef<(HTMLDivElement|null)[]>([])
