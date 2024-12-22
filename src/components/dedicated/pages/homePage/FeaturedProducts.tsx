import { useFetchFeaturedProductsQuery } from "@/store/apiSlices/productSlice";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/utils/types/types";
import CardButton from "@/components/buttons/CardButton";
import TagButton from "@/components/buttons/TagButton";
import CustomButton from "@/components/buttons/CustomButton";
import { BsArrowRightShort } from "react-icons/bs";
import PrimaryCard from "@/components/cards/PrimaryCard";
function FeaturedProducts() { 
  const {data:response} = useFetchFeaturedProductsQuery({}); //console.log(response);
  const navigate = useNavigate()
  return (
    <div className="montserrat container mx-auto flex flex-col ">

      <div className="c7 p-3 px-6 mt-3 |  flex justify-between items-center
        md:c5 md:p-3 md: md:mt-3" >
        <h1 className="text-blue-500">popular Products</h1>

        <CustomButton className="c4 gap-2 | flex items-center" text="view more">
          <BsArrowRightShort />
        </CustomButton>
      </div>

      <div className=" gap-4 p-3 | grid grid-cols-2  
        md:p-6 md:grid-cols-4">
        {
          response?.products && 
          response?.products.map((product:IProduct) => 
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
  );
}

export default FeaturedProducts;


