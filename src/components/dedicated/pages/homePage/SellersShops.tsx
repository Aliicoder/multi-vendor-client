import { useRef } from "react";
import { ISeller } from "@/utils/types/types";
import useSellersPagination from "@/hooks/useSellerPagination";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Border from "@/components/borders/Border";
import CustomButton from "@/components/buttons/CustomButton";
function SellersShops() { 
  const { sellers } = useSellersPagination({}) 
  const navigate = useNavigate()
  const refImages = useRef<(HTMLImageElement | null)[]>([]);
  const refWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const handleImageLoad = (imgRef:HTMLImageElement, containerRef:HTMLDivElement) => {
    const imgHeight = imgRef.offsetHeight;
    const containerHeight = containerRef.offsetHeight;
    if (imgHeight > containerHeight) {
      imgRef.classList.add('w-full');
      imgRef.classList.remove('h-full');
    } else {
      imgRef.classList.add('h-full');
      imgRef.classList.remove('w-full');
    }
  }; 

  return (
    <div className="container mx-auto flex flex-col montserrat bg-white 
      md:bg-inherit">
      <div className="c7 p-3 px-6 mt-3 |  flex justify-between items-center
        md:c5 md:p-3 md: md:mt-3" >
        <h1 className="text-blue-500">popular Products</h1>

        <CustomButton className="c4 p-2 | bg-white rounded-lg" text="view all">

        </CustomButton>
      </div>


      <Carousel className="mx-auto !static  ">    
        <CarouselContent className="-ml-1">
          { sellers&&sellers.map((seller:ISeller,i:number) => (
              <CarouselItem key={seller.name} className="pl-1 basis-4/12  md:basis-1/2 lg:basis-4/12">
                <Card
                  onClick={()=>navigate(`/shops/${seller._id}`,{state:{shop:seller}})} 
                  className=" border-0 shadow-none bg-transparent">
                  <CardContent className="p-6">
                    <Border cornerRadius={16} 
                      topStyle="p-[1px] bg-slate-200" 
                      bottomStyle="gap-[6%] p-3 flex  items-center  bg-white">
                      <div ref={(el)=> (refWrappers.current[i] = el)} 
                        className="basis-3/12 shrink-0 flex justify-center items-center aspect-square overflow-hidden rounded-full border">
                        <img  
                          ref={(el)=> (refImages.current[i] = el)} 
                          className=""
                          src={seller.avatar || "/fb.jpg"} 
                          onLoad={() => handleImageLoad(refImages.current[i]!, refWrappers.current[i]!)} 
                          />
                      </div>

                      <div className="flex grow flex-col ">
                        <h1 className="c3 text-center font-semibold  ">{seller.name}</h1>
                      </div>              
                    </Border>
                  </CardContent>
                </Card>
            </CarouselItem>
           )
          )}
          
        </CarouselContent>

      </Carousel>


    </div>
  );
}

export default SellersShops;


