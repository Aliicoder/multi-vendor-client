export interface IClientChat {
  _id: string;
  recentMessage: string;
  seller:{
    _id: string;
    avatar: string;
    businessName: string;
  }
}
export interface IMessage {
  _id: string;
  chatId:Object
  senderId: Object
  receiverId: Object
  message:string
  isDelivered :boolean
  isRead: boolean
}

export interface ICategory {
  _id:string;
  name:string;
  media:{
    url:string
  }
}

export interface ISeller {
  _id: string;
  name: string
  businessName: string
  avatar:string

  description:string;
  categories:string[]
}


export interface ICounter {
  prev: number;
  curPage: number;
  next: number;
  pagesLen: number;
}

export interface IQueryParams {
  searchValue: string
  curPage:number
  perPage:number
}
export interface IMedia {
  url: string
  public_id: string
}
export interface IProduct extends Document {
  _id:string;
  name: string;
  category: string
  shopName: string
  description: string;
  brand: string
  slug: string
  media: IMedia[];
  price: number;
  stock: number;
  rating: number;
  discount: number;
  outOfStock: boolean
}
export interface IUnit {
  productId: IProduct
  noOfProducts : number
  price : number
}
export interface ICartOrder {
  _id:string
  sellerId: string
  units:IUnit[]
  noOfProducts : number
  amount : number
  shopName : string
}

export interface ICart {
  clientId: string;
  orders: ICartOrder[];
  units: IUnit[];
  totalNoOfProducts: number;
  totalAmount: number;
  status: "active" | "settled";
}

export interface IOrder extends ICartOrder {
  clientId : string
  address : IAddress
  courierId: string
  status : "pending" | "active" | "settled"
  createdAt: string
  updatedAt: string
}

export interface IAddress {
  _id: string
  type: "home" | "work" | "other"
  city:string;
  area:string;
  phone:string;
  pinCode:string;
  province:string;
}
