import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import useProductsPagination from "@/hooks/useProductsPagination";
import CardButton from "@/components/buttons/CardButton";
import { IProduct } from "@/utils/types/types";
import TagButton from "@/components/buttons/TagButton";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { IoIosArrowBack } from "react-icons/io";
function CategoryProductsPage() { 
  const { state } = useLocation()
  const { products } = useProductsPagination({category:state.category.name,perPage:8,sort:{}})
  const navigate = useNavigate()
  return (
    <div className="container mx-auto flex flex-col">

      <CustomButton onClick={()=>navigate(`/home`)}
        className="c8 p-6 gap-3 |  flex items-center | bg-slate-50" 
        direction="left" text={state?.category?.name}  >
        <IoIosArrowBack />
      </CustomButton>

      <div className="grid gap-4 grid-cols-2 p-6 md:grid-cols-4">
      { products && products.map((product:IProduct) => 
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
                <h1 onClick={()=>navigate(`/home/shops/`)} 
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

export default CategoryProductsPage