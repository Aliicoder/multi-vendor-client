import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import { IoArrowBackSharp } from "react-icons/io5";
import useProductsPagination from "@/hooks/useProductsPagination";
import CardButton from "@/components/buttons/CardButton";
import { IProduct } from "@/utils/types/types";
import TagButton from "@/components/buttons/TagButton";
import PrimaryCard from "@/components/cards/PrimaryCard";
function ShopProductsPage() { 
  const { state } = useLocation() ; console.log("shopName", state.shop)
  const { products } = useProductsPagination({perPage:8,shopName:state.shop.name})
  const navigate = useNavigate()
  return (
    <div className="container mx-auto flex flex-col">
      <div onClick={()=>navigate("/")} className="p-6 gap-3 flex items-center">
        <CustomButton> 
          <IoArrowBackSharp />
        </CustomButton>

        <div>
          {state?.shop?.name} 
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
        {
          products && 
          products.map((product:IProduct) => 
          <PrimaryCard key={product._id}>
            <div className="relative flex  justify-center items-center overflow-hidden">
              <img
                className="scale-75 aspect-square object-contain group-hover:scale-90 transition-all"
                src={product?.media[0].url}
                loading="lazy"
              />
              <TagButton productId={product._id} />
            </div>

            <div id="description" className="basis-1/3 shrink-0 gap-2 p-3  flex flex-col    
              md:p-8 md:gap-2 ">

              <h1 className="c4 py-3  font-semibold
                md:c3 md:py-3">
                {product.name}
              </h1>

              <div className="flex justify-between gap-2">
                <div className="flex justify-center items-center">
                  <h1 onClick={()=>navigate("/products/:productId")} 
                    className="c3 text-center text hover:underline text-blue-500 cursor-pointer">
                      {product.shopName}
                  </h1>
                </div>

                <div className="flex justify-center items-center">
                  <div className="c4  font-semibold grow 
                    md:c3">
                    ${product.price}
                  </div>
                </div>
              </div>

              <p className="line-clamp-2 c3
                md:">
                {product.description}
              </p>

              <CardButton product={product}/>
            </div>
          </PrimaryCard>
        )}
       
      </div>

    </div>    
  )
}

export default ShopProductsPage