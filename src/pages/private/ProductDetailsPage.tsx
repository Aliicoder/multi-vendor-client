import CardButton from "@/components/buttons/CardButton";
import CustomButton from "@/components/buttons/CustomButton";
import TagButton from "@/components/buttons/TagButton";
import Header from "@/components/shared/Header";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { errorToast } from "@/lib/utils";
import { useEstablishChatMutation } from "@/store/apiSlices/chatSlice";
import {
  useGetPaginatedProductsQQuery,
  useGetProductQuery,
} from "@/store/apiSlices/productSlice";
import { IMedia, IProduct } from "@/types/types";
import { currencyFormatter } from "@/utils/functions/currencyFormatter";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const previewCarouselRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [establishChatMutation] = useEstablishChatMutation();
  const { productId } = useParams();
  const { data: response } = useGetProductQuery({ productId });
  const { data: response2, isSuccess } = useGetPaginatedProductsQQuery(
    { category: response?.product?.category, outOfStock: false },
    {
      skip: response ? false : true,
    }
  );
  const handleMiniImageClick = (index: number) => {
    if (previewCarouselRef.current) {
      const carouselElement = previewCarouselRef.current;
      const itemWidth = carouselElement.clientWidth;
      const offset = index * itemWidth;
      carouselElement.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }
  };
  const handleEstablishChatClick = async (participantId: string) => {
    try {
      const response = await establishChatMutation({
        userType: "client",
        participantId,
        participantType: "seller",
      }).unwrap();
      console.log("response ", response);
      navigate(`/account/chats/${response.chat._id}`, {
        state: { chat: response.chat },
      });
      console.log(response.chat);
    } catch (error) {
      errorToast(error);
    }
  };
  useEffect(() => {
    let filterProducts = response2?.products?.filter(
      (product: IProduct) => product._id !== productId
    );
    setSuggestedProducts(filterProducts);
  }, [isSuccess]);
  return (
    <>
      <Header className="drop-shadow-sm" />

      <section className="">
        <div
          id="product-details"
          className="container flex gap-2 mx-auto py-10"
        >
          <div
            id="product-images"
            className="flex flex-col basis-3/12 gap-12 justify-center"
          >
            <Carousel id="big-images" className="w-full mx-auto">
              <CarouselContent ref={previewCarouselRef} className="-ml-1">
                {response?.product?.media.map((media: IMedia) => (
                  <CarouselItem key={media.url}>
                    <Card className="bg-transparent border-0 shadow-none">
                      <CardContent>
                        <div className="drop-shadow-sm justify-center rounded-md aspect-square items-center overflow-hidden">
                          <img src={media.url} />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <Carousel id="small-images" className="w-full mx-auto">
              <CarouselContent className="flex justify-center -ml-1">
                {response?.product?.media?.map(
                  (media: IMedia, index: number) => (
                    <CarouselItem
                      onClick={() => handleMiniImageClick(index)}
                      key={media.url}
                      className="basis-3/12"
                    >
                      <Card className="bg-transparent border-0 shadow-none">
                        <CardContent className="p-0">
                          <div className="drop-shadow-sm der justify-center rounded-md aspect-square items-center overflow-hidden">
                            <img src={media.url} />
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
            </Carousel>
          </div>

          <div
            id="product-information"
            className="flex flex-col p-6 grow gap-2 font-montserrat"
          >
            <h1 className="text-fs-49 p-3 font-medium   ">
              {response?.product?.name}
            </h1>
            <h1 className="p-3 w-9/12 rounded-md text-blue-500">
              {response?.product?.description}
            </h1>
            <h1 className="p-3 font-semibold">
              {currencyFormatter("INR", response?.product?.price)}
            </h1>

            <div className="flex justify-start gap-3 py-8">
              <TagButton productId={response?.product?._id} />

              <CardButton product={response?.product} />
            </div>

            <h1 className="flex text-blue-500 gap-2">
              Provided by{" "}
              <span className="font-semibold">
                {response?.product.shopName}
              </span>
            </h1>
            <CustomButton
              onClick={() =>
                handleEstablishChatClick(response?.product?.sellerId)
              }
              className="w-fit mt-5"
              theme="black"
            >
              Chat Now
            </CustomButton>
          </div>
        </div>
        <div id="suggested-products">
          <ProductsCarousel
            title={"Suggested Products"}
            products={suggestedProducts}
          />
        </div>
      </section>
    </>
  );
}

export default ProductDetailsPage;

{
  /* <div onClick={()=>handleStartChat(response?.product?.sellerId)} className="text-blue-500 cursor-pointer hover:underline">
              chat with seller
            </div> */
}
// const [establishChatMutation] = useEstablishChatMutation()
// const handleStartChat = async (sellerId:string) =>{
//    tryCatch( async ()=>{
//     const response = await establishChatMutation({sellerId}).unwrap()
//     toast.success(response.message)
//     navigate(`/sellersChats/${response.chatId}`,{})
//    })
// }

{
  /* <div>
        <ul className="flex gap-2 transition-all">
          <li onClick={()=>setActiveNav("reviews")} className={`${activeNav == "reviews" ? "bg-white border":""} p-3 py-1 rounded-md`}>Reviews</li>
          <li onClick={()=>setActiveNav("details")} className={`${activeNav == "details" ? "bg-white":""} p-3 py-1  border rounded-md`}>Details</li>
          <li onClick={()=>setActiveNav("shop")} className={`${activeNav == "shop" ? "bg-white border":""} p-3 py-1  border rounded-md`}>Shop</li>
        </ul>
      </div>
      <div className="flex flex-col bg-white border p-6 rounded-md">
        <div className="flex p-6 gap-6">
          <div className="flex flex-col gap-2">
            <div><span className="c9">3 /</span > <span className="c7">5</span></div>
            <div><span className="text-green-500">32 reviews</span></div>
            <div className="flex c2 gap-1">{productRating(5)}</div> 
          </div>
          <div className="flex flex-col gap-3">
           <div className="flex gap-3 items-center">
            <div>59</div>
            <div className="border h-2 rounded-md w-[300px]" >
              <div className="bg-yellow-500 h-full w-[90%]" /> 
            </div>
            <div className="flex c2 gap-1">{productRating(4)}</div>
           </div>
           <div className="flex gap-3 items-center">
            <div>12</div>
            <div className="border h-2 rounded-md w-[300px]" >
              <div className="bg-yellow-500 h-full w-[90%]" /> 
            </div>
            <div className="flex c2 gap-1">{productRating(3)}</div>
           </div>
           <div className="flex gap-3 items-center">
            <div>19</div>
            <div className="border h-2 rounded-md w-[300px]" >
              <div className="bg-yellow-500 h-full w-[90%]" /> 
            </div>
            <div className="flex c2 gap-1">{productRating(2)}</div>
           </div>
           <div className="flex gap-3 items-center">
            <div>15</div>
            <div className="border h-2 rounded-md w-[300px]" >
              <div className="bg-yellow-500 h-full w-[90%]" /> 
            </div>
            <div className="flex c2 gap-1">{productRating(1)}</div>
           </div>
           <div className="flex gap-3 items-center">
            <div>11</div>
            <div className="border h-2 rounded-md w-[300px]" >
              <div className="bg-yellow-500 h-full w-[90%]" /> 
            </div>
            <div className="flex c2 gap-1">{productRating(0)}</div>
           </div>
          </div>
        </div>
        <h1 className="font-semibold">Customer Reviews</h1>
        <div className="flex flex-col p-6 gap-1">
            <h1>Salem ahmed</h1>
            <div className="flex c2 gap-1">{productRating(4)}</div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident voluptas consequuntur corrupti odit et eveniet libero? Officia magnam mollitia accusantium voluptatem harum nobis natus? Nemo temporibus veniam nesciunt rem quaerat!
            </p>
        </div>
        <div className="flex flex-col p-6 gap-1">
            <h1>Salem ahmed</h1>
            <div className="flex c2 gap-1">{productRating(4)}</div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident voluptas consequuntur corrupti odit et eveniet libero? Officia magnam mollitia accusantium voluptatem harum nobis natus? Nemo temporibus veniam nesciunt rem quaerat!
            </p>
        </div>
        <div className="flex justify-center">
          <h1 className="text-blue-500 cursor-pointer hover:underline">Show more reviews</h1>
        </div>
      </div> */
}
