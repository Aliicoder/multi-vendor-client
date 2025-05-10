export type IPaymentOptions = "cod" | "upi" | "paypal";
export type Role = "admin" | "seller" | "courier" | "client";

export interface IUser {
  _id: string;
  media: IMedia;
  name: string;
  email: string;
  description: string;
  roles: Role;
  method: "standard" | "google";
  password: string;
  googleId: string;
  addresses: IAddress[];
  businessAddresses: IAddress[];
  refreshToken: string;
  passwordResetToken: string;
  passwordResetTokenExpiration: Date;
}

export interface IParticipant {
  userId: IUser;
  userType: "client" | "seller" | "admin" | "courier";
}
export interface IChat {
  _id: string;
  recentMessage: string;
  participants: IParticipant[];
}
export interface IMessage {
  _id: string;
  chatId: Object;
  senderId: Object;
  receiverId: Object;
  message: string;
  isDelivered: boolean;
  isRead: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  media: {
    url: string;
  };
}

export interface ISeller {
  _id: string;
  name: string;
  media: IMedia;
  email: string;
  password: string;
  addresses: IAddress[];
  roles: number[];
  method: string;
}

export interface ICounter {
  prev: number;
  curPage: number;
  next: number;
  pagesLen: number;
}

export interface IQueryParams {
  searchValue: string;
  curPage: number;
  perPage: number;
}
export interface IMedia {
  url: string;
  public_id: string;
}
export interface IProduct {
  _id: string;
  name: string;
  category: string;
  shopName: string;
  description: string;
  brand: string;
  slug: string;
  media: IMedia[];
  price: number;
  stock: number;
  rating: number;
  discount: number;
  outOfStock: boolean;
}
export interface IUnit {
  productId: IProduct;
  quantity: number;
  price: number;
}
export interface ICartOrder {
  _id: string;
  sellerId: string;
  units: IUnit[];
  noOfProducts: number;
  amount: number;
  shopName: string;
}

export interface ICart {
  clientId: string;
  orders: ICartOrder[];
  units: IUnit[];
  totalNoOfProducts: number;
  totalAmount: number;
  status: "active" | "settled";
}
export interface IOrder {
  _id?: string;
  userId: string;
  sellerId: string;
  productId: IProduct;
  amount: number;
  quantity: number;
  shopName: string;
  deliveryStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "cash" | "upi" | "paypal";
  paymentStatus: "pending" | "paid";
}

export interface ICourier {
  _id: string;
  media: IMedia;
  name: string;
  email: string;
  password: string;
}

export interface IAddress {
  _id?: string;
  lng: number;
  lat: number;
  city: string;
  street: string;
  phone: string;
  province: string;
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export interface AuthResponse {
  user: {
    userId: string;
    name: string;
    avatar: string;
    roles: Role[];
    accessToken: string;
  };
}

export interface IAuthState {
  userId: string;
  name: string;
  email?: string;
  accessToken: string;
  addresses: IAddress[];
}
export interface IClient {
  _id: string;
  media: IMedia;
  name: string;
  email: string;
  addresses: IAddress[];
  roles: number[];
  password: string;
  refreshToken: string;
  passwordResetToken: String;
  passwordResetTokenExpiration: Date;
}

// Currency types
export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY"; // Add more as needed

export interface Product {
  id: string;
  name: string;
  price: number; // Always in USD
  description?: string;
}

export interface ExchangeRates {
  [key: string]: number; // Key is currency code, value is rate
}

// PayPal related types
export interface CreateOrderRequest {
  productId: string;
  currency: CurrencyCode;
  amount: string;
}

export interface CreateOrderResponse {
  orderId: string;
}
