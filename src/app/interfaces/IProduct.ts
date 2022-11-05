import {IPriceChange} from "./IPriceChange";

export interface IProduct {
  ID:number
  DisplayName:string
  ProductName:string
  CategoryID:number
  OriginalOwnerUsername:string
  Description:string
  BasePrice:number
  Image:string
  Discontinued:boolean
  AvaliableOnDate:Date
  Weight:number
  MAPPrice:number
  CostToMake:number
  PriceChangeRequest:IPriceChange []
}
