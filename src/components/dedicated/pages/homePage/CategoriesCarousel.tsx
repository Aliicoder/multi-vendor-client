
import { useFetchCategoriesChunkQQuery } from "@/store/apiSlices/categorySlice"
import {useRef} from "react"
import { ICategory } from "@/utils/types/types"
import Border from "@/components/borders/Border"
import { useNavigate } from "react-router-dom"
import useSquircle from "@/hooks/useSquircle"
function CategoriesCarousel() { 
  const {data:response} = useFetchCategoriesChunkQQuery({});
  const imagesRefs = useRef<(HTMLDivElement|null)[]>([])
  const wrappersRefs = useRef<(HTMLDivElement|null)[]>([])
  const navigate = useNavigate()
  const cornerRadius = useSquircle()
  const resizeImage = (curImage:HTMLDivElement,curWrapper:HTMLDivElement) =>{
    if(curImage && curWrapper){
      const imgHeight = curImage.offsetHeight;
      const containerHeight = curWrapper.offsetHeight; 
      if (imgHeight > containerHeight) {
        curImage.classList.add('w-full');
        curImage.classList.remove('h-full');
      } else {
        curImage.classList.add('h-full');
        curImage.classList.remove('w-full');
      }
    }
  }
  return (
    <div className='montserrat container mx-auto flex flex-col overflow-hidden'>
      <div className="mx-auto flex overflow-x-scroll hide-scrollbar ">    
          { 
            response?.categories&&response?.categories.map((category:ICategory,i:number) => (
             <div className="p-2 | shrink-0 basis-2/12  md:basis-4/2 lg:basis-2/12">
                <Border key={category._id} cornerRadius={cornerRadius} 
                  onClick = {()=> navigate(`categories/${category._id}`,{state:{category}})}
                  topStyle=" p-[1px] bg-slate-200"
                  bottomStyle="p-1 gap-1  |  flex items-center rounded-md bg-white 
                  md:p-3 md:gap-6" >
                  <div 
                    ref = { (el) => (wrappersRefs.current[i] = el) }
                    className="basis-3/12 flex justify-center items-center aspect-square overflow-hidden rounded-full border">
                    <img  
                      ref={ (el) => (imagesRefs.current[i] = el) }
                      className=""
                      src={category.media.url} 
                      alt={category.name}  
                      onLoad={()=>resizeImage(imagesRefs.current[i]!,wrappersRefs.current[i]!)}
                      />
                  </div>
                                    
                  <h1 className="c6 | grow text-center
                    md:c3">
                    {category.name}
                  </h1>
                </Border>
             </div>
            ))
        }
  
      </div>
    </div>
  )
}



export default CategoriesCarousel


