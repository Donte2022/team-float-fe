import {IPriceChange} from "./IPriceChange";

export interface IProduct {
  id:number
  displayName:string
  productName:string
  description:string
  price:number
  imageUrl:string
  discontinued:boolean
  dateAvailable:Date
  weight:number
  map:number
  costToMake:number
  PriceChange:IPriceChange []
}
