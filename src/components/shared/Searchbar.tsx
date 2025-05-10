import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useSetTimeout from "@/hooks/useSetTimeout";
import { useGetSearchedProductsQuery } from "@/store/apiSlices/productSlice";
import { useNavigate } from "react-router-dom";
import { ICategory, IProduct } from "@/types/types";

function Searchbar() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { data: response } = useGetSearchedProductsQuery(
    { name },
    {
      skip: name.length == 0,
    }
  );
  const { timeouter } = useSetTimeout();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    console.log(value);
    timeouter(() => {
      setName(value);
    }, 2000);
  };
  return (
    <div className="w-1/2 px-3 py-2 z-50">
      <div className="relative">
        <div className="flex bg-blue-50 rounded-lg items-center">
          <div className="p-2 text-blue-500 text-fs-16 font-bold">
            <CiSearch className="m-1 cursor-pointer" />
          </div>

          <input
            onChange={handleSearchChange}
            placeholder={`Search`}
            className="p-2  w-full  outline-none rounded-lg bg-inherit"
            type="text"
          />
        </div>
        {response && response.suggestions && name.length > 0 && (
          <div className="bg-white border border-t-0 rounded-b-lg w-full absolute mt-2 top-full z-[120]">
            {response.suggestions.products.map((product: IProduct) => (
              <h1
                key={product.name}
                onClick={() =>
                  navigate(`/products`, { state: { name: product.name } })
                }
                className="flex bg-white m-1 p-2 rounded-lg cursor-pointer px-4"
              >
                {product.name}
              </h1>
            ))}
            {response.suggestions.brands.map((brand: string) => (
              <h1
                key={brand}
                onClick={() => navigate(`/products`, { state: { brand } })}
                className="flex bg-white m-1 p-2 rounded-lg cursor-pointer px-4"
              >
                {brand} brand
              </h1>
            ))}
            {response.suggestions.categories.map((category: ICategory[]) => (
              <h1
                key={category[category.length - 1].name}
                onClick={() =>
                  navigate(
                    `/categories/${category[category.length - 1].name}`,
                    {
                      state: { category: category[category.length - 1].name },
                    }
                  )
                }
                className="flex bg-white m-1 p-2 rounded-lg cursor-pointer px-4"
              >
                {category[category.length - 1].name} category
              </h1>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;

// import { useReducer } from "react";
// import { CiSearch } from "react-icons/ci"
// import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
// import { Checkbox } from "../ui/checkbox";
// import { useFetchProductsChunkMMutation } from "@/store/apiSlices/productSlice";
// import { useFetchCategoriesChunkMMutation } from "@/store/apiSlices/categorySlice";
// import { useFetchSellersChunkMMutation } from "@/store/apiSlices/sellerSlice";
// import useSetTimeout from "@/hooks/useSetTimeout";
// import { useNavigate } from "react-router-dom";
// import Border from "../borders/Border";
// import useSquircle from "@/hooks/useSquircle";
// interface ISearch {
//   name: string;
//   visible:boolean
//   selectedOption: "Products" | "Categories" | "Shops"
//   options:["Products", "Categories","Shops"]
//   data:any[]
// }
// let initialState:ISearch = {
//   name: "",
//   visible: false,
//   selectedOption: "Products",
//   options:["Products","Categories","Shops"],
//   data:[]
// }
// type IActions =
// {type:"CHANGE_VISIBILITY" ; payload: boolean  } |
// {type:"CHANGE_SEARCH_NAME" ; payload: string } |
// {type:"CHANGE_OPTION" ; payload: "Products" | "Categories" | "Shops" } |
// {type:"SET_DATA" ; payload: []  }

// let reducerFunction = (state:ISearch,action:IActions) =>{
//   switch(action.type){
//     case "CHANGE_VISIBILITY":
//       return {...state,visible:action.payload}
//     case "CHANGE_SEARCH_NAME":
//       return action.payload == "" ? {...state,searchName:action.payload,data:[]} : {...state,name:action.payload }
//     case "CHANGE_OPTION":
//       return {...state,selectedOption:action.payload, visible:false,data:[]}
//     case "SET_DATA":
//       return {...state,data:action.payload}
//     default:
//       return state
//   }
// }
// function Searchbar() {
//   const [state,dispatch] = useReducer(reducerFunction,initialState)
//   const {timeouter} = useSetTimeout()
//   const cornerRadius = useSquircle()
//   const navigate = useNavigate()
//   let [fetchProducts] = useFetchProductsChunkMMutation()
//   let [fetchCategories] = useFetchCategoriesChunkMMutation()
//   let [fetchShops] = useFetchSellersChunkMMutation()
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
//     let name = event.target.value
//     timeouter(()=>{
//       if(name != state.name){
//         dispatch({type:"CHANGE_SEARCH_NAME",payload:name})
//         search(name)
//       }
//     },2000)
//   }
//   const search = async (name:string) => {
//     let response: any = [];
//    if(name.length > 1){
//     if (state.selectedOption === "Products") {
//       try {
//         console.log("name >>",name)
//         response = await fetchProducts({ name }).unwrap();  console.log("products response >> " , response)
//         dispatch({ type: "SET_DATA", payload: response.products });
//       } catch (error) {}
//     }

//     if (state.selectedOption === "Categories") {
//       try {
//         response = await fetchCategories({ name }).unwrap(); console.log("categories response >>" , response)
//         dispatch({ type: "SET_DATA", payload: response.categories });
//       } catch (error) {}
//     }

//     if (state.selectedOption === "Shops") {
//       try {
//         response = await fetchShops({ name }).unwrap(); console.log("shops response >>" , response)
//         dispatch({ type: "SET_DATA", payload: response.shops });
//       } catch (error) {}
//     }
//    }
//   }
//   const handleNavigation = (item:any) =>{
//     if(state.selectedOption == "Products")
//       navigate(`${state.selectedOption}/${item._id}`,{state:{product:item}})
//     else if(state.selectedOption == "Categories")
//       navigate(`${state.selectedOption}/${item._id}`,{state:{category:item}})
//     else if(state.selectedOption == "Shops")
//       navigate(`${state.selectedOption}/${item._id}`,{state:{shop:item}})
//   }
//   return (
//     <div className="w-full sticky z-50 top-0
//       md:w-1/2">
//       <div className='flex p-2 w-full | items-center relative'>

//         <Border cornerRadius={cornerRadius}
//           topStyle="w-full  p-[1px] bg-blue-500"
//           bottomStyle='flex  grow items-center  bg-slate-50  rounded-lg '>
//           <div className="c8 mx-[2%]
//             md:c5">
//             <CiSearch  className="m-1 cursor-pointer"/>
//           </div>

//           <input
//             onChange={handleSearchChange}
//             placeholder={`search in "${state.selectedOption}"`}
//             className={` w-full py-2  c8  rounded-lg bg-slate-50 transition-all  outline-none
//                md:c4`}
//             type="text" />

//           <div onClick={()=>dispatch({type:"CHANGE_VISIBILITY",payload:!state.visible})}
//             className="c8 mr-3 border-l pl-3 mx-[2%]
//             md:c5">
//             <HiOutlineAdjustmentsHorizontal />
//           </div>

//         </Border>

//       </div>
//       { state.visible &&
//          <ul  className='bg-slate-200 p-1 rounded-lg w-full absolute top-0 z-[-1]'>
//           <li className='h-full p-1 rounded-md invisible mb-3 relative z-[-1]'>place holder</li>
//           <li className='flex p-2 cursor-pointer px-4' >
//             search in
//           </li>
//           {
//             state.options.map((option)=>(
//             <div key={option} onClick={()=>dispatch({type:"CHANGE_OPTION",payload:option})} className="flex p-3 items-center space-x-2">
//               <Checkbox id="terms" checked={state.selectedOption == option } />
//               <label htmlFor="terms"
//                 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                 {option}
//               </label>
//             </div>
//             ))
//           }
//         </ul>
//         }
//         {
//           (!state.visible && state.data.length > 0) &&
//           <ul className='bg-slate-200 p-1 rounded-lg w-full absolute top-0 z-[-1]'>
//             <li className='bg-white h-full p-1 rounded-md invisible mb-3 py-2 relative z-[-1]'>place holder</li>
//             {
//               state.data.map((item:any)=>(
//                   <li onClick={()=>handleNavigation(item)}
//                     className='flex bg-white m-1 p-2 rounded-lg cursor-pointer px-4' key={item.name}>
//                     {item.name}
//                   </li>
//                 ))
//             }
//           </ul>
//         }
//     </div>

//   )
// }

// export default Searchbar
