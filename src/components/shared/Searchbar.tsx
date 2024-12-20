import { useReducer } from "react";
import { CiSearch } from "react-icons/ci"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Checkbox } from "../ui/checkbox";
import { useFetchProductsChunkMMutation } from "@/store/apiSlices/productSlice";
import { useFetchCategoriesChunkMMutation } from "@/store/apiSlices/categorySlice";
import { useFetchSellersChunkMMutation } from "@/store/apiSlices/sellerSlice";
import useSetTimeout from "@/hooks/useSetTimeout";
import { useNavigate } from "react-router-dom";
interface ISearch {
  name: string;
  visible:boolean
  selectedOption: "Products" | "Categories" | "Shops"
  options:["Products", "Categories","Shops"]
  data:any[]
}
let initialState:ISearch = {
  name: "",
  visible: false,
  selectedOption: "Products",
  options:["Products","Categories","Shops"],
  data:[]
}
type IActions = 
{type:"CHANGE_VISIBILITY" ; payload: boolean  } | 
{type:"CHANGE_SEARCH_NAME" ; payload: string } |
{type:"CHANGE_OPTION" ; payload: "Products" | "Categories" | "Shops" } |
{type:"SET_DATA" ; payload: []  } 

let reducerFunction = (state:ISearch,action:IActions) =>{
  switch(action.type){
    case "CHANGE_VISIBILITY":
      return {...state,visible:action.payload}
    case "CHANGE_SEARCH_NAME":
      return action.payload == "" ? {...state,searchName:action.payload,data:[]} : {...state,name:action.payload }
    case "CHANGE_OPTION":
      return {...state,selectedOption:action.payload, visible:false,data:[]}
    case "SET_DATA":
      return {...state,data:action.payload}
    default:
      return state
  }
}
function Searchbar() {
  const [state,dispatch] = useReducer(reducerFunction,initialState)
  const {timeouter} = useSetTimeout()
  const navigate = useNavigate()
  let [fetchProducts] = useFetchProductsChunkMMutation()
  let [fetchCategories] = useFetchCategoriesChunkMMutation()
  let [fetchShops] = useFetchSellersChunkMMutation()
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    let name = event.target.value
    timeouter(()=>{
      if(name != state.name){
        dispatch({type:"CHANGE_SEARCH_NAME",payload:name})
        search(name)
      }
    },2000)
  }
  const search = async (name:string) => {
    let response: any = [];
   if(name.length > 1){
    if (state.selectedOption === "Products") {
      try {
        console.log("name >>",name)
        response = await fetchProducts({ name }).unwrap();  console.log("products response >> " , response)
        dispatch({ type: "SET_DATA", payload: response.products });
      } catch (error) {}
    }

    if (state.selectedOption === "Categories") {
      try {
        response = await fetchCategories({ name }).unwrap(); console.log("categories response >>" , response)
        dispatch({ type: "SET_DATA", payload: response.categories });
      } catch (error) {}
    }

    if (state.selectedOption === "Shops") {
      try {
        response = await fetchShops({ name }).unwrap(); console.log("shops response >>" , response)
        dispatch({ type: "SET_DATA", payload: response.shops });
      } catch (error) {}
    }
   }
  }
  const handleNavigation = (item:any) =>{
    if(state.selectedOption == "Products")
      navigate(`${state.selectedOption}/${item._id}`,{state:{product:item}})
    else if(state.selectedOption == "Categories")
      navigate(`${state.selectedOption}/${item._id}`,{state:{category:item}})
    else if(state.selectedOption == "Shops")
      navigate(`${state.selectedOption}/${item._id}`,{state:{shop:item}})
  }
  return (
    <div className="relative w-full md:w-1/2">
      <div className='p-2 | relative flex w-full  items-center '>   

        <div className='flex grow items-center  bg-slate-100  rounded-lg '>
          <div className="c7 mx-[2%] 
            md:c5">
            <CiSearch  className="m-1 cursor-pointer "/>
          </div>

          <input 
            onChange={handleSearchChange}
            placeholder={`search in "${state.selectedOption}"`}
            className={` w-full py-2  c6  rounded-lg bg-slate-100 transition-all  outline-none
               md:c4`}
            type="text" />   
        </div>

        <div onClick={()=>dispatch({type:"CHANGE_VISIBILITY",payload:!state.visible})} className="c7 mx-[2%] 
          md:c5">
          <HiOutlineAdjustmentsHorizontal />
        </div>

      </div>
      { state.visible && 
         <ul  className='p-1 rounded-lg absolute bg-slate-200 z-[-1] top-0 w-full    '>
          <li className='p-1 relative z-[-1] h-full invisible mb-3   rounded-md  '>place holder</li>
          <li className='p-2 px-4 cursor-pointer   flex' >
            search options
          </li>
          {
            state.options.map((option)=>(
            <div key={option} onClick={()=>dispatch({type:"CHANGE_OPTION",payload:option})} className="p-3 flex items-center space-x-2">
              <Checkbox id="terms" checked={state.selectedOption == option } />
              <label htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {option}
              </label>
            </div>
            ))
          }
        </ul>
        }
        {  
          (!state.visible && state.data.length > 0) &&
          <ul className='p-1 rounded-lg absolute bg-slate-200 z-[-1] top-0 w-full   '>
            <li className='p-1 py-2 relative z-[-1] h-full invisible mb-3  bg-white rounded-md  '>place holder</li>
            {
              state.data.map((item:any)=>(
                  <li onClick={()=>handleNavigation(item)}
                    className='m-1 p-2 px-4 rounded-lg cursor-pointer bg-white   flex' key={item.name}>
                    {item.name}
                  </li>
                ))
            }
          </ul>
        }
    </div>
    
  )
}

export default Searchbar
