import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import { IoArrowBackSharp } from "react-icons/io5";
import useProductsPagination from "@/hooks/useProductsPagination";
import Border from "@/components/borders/Border";
import CardButton from "@/components/buttons/CardButton";
import { IProduct } from "@/utils/types/types";
import TagButton from "@/components/buttons/TagButton";
function CategoryProductsPage() { 
  const { state } = useLocation()
  const { products } = useProductsPagination({category:state.category.name,perPage:8,sort:{}})
  const navigate = useNavigate()
  return (
    <div className="container mx-auto flex flex-col">
      <div className="p-6 gap-3 flex items-center">
        <CustomButton> 
          <IoArrowBackSharp />
        </CustomButton>

        <div onClick={()=>navigate("/")} >
          {state?.category?.name} 
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
        {
          products && 
          products.map((product:IProduct) => 
          <Border
            topStyle="p-[1px]  bg-slate-200 hover:shadow-md"
            bottomStyle="flex flex-col h-full bg-white" 
            cornerRadius={16}>
            <div className="relative flex  justify-center items-center overflow-hidden">
              <img
                className="scale-75 aspect-square object-contain"
                src={product?.media[0].url}
                loading="lazy"
              />
              <TagButton productId={product._id} />
            </div>

            <div id="description" className="basis-1/3 shrink-0 gap-2 p-8  flex flex-col    ">

              <h1 className="c3 py-3 font-semibold">{product.name}</h1>

              <div className="flex justify-between gap-2">
                <div className="flex justify-center items-center">
                  <h1 onClick={()=>navigate("/products/:productId")} 
                    className="c3 text-center text hover:underline text-blue-500 cursor-pointer">
                      {product.shopName}
                  </h1>
                </div>

                <div className="flex justify-center items-center">
                  <div className="cp-6 c3 font-semibold grow ">${product.price}</div>
                </div>
              </div>

              <p className="line-clamp-2">
                {product.description}
              </p>
              
              <CardButton product={product}/>
            </div>
          </Border>    
        )}
       
      </div>

    </div>    
  )
}

export default CategoryProductsPage