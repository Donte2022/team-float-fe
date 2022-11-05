import {IProduct} from "./IProduct";

export interface ICategory {
  ID:number
  Name:string
  OriginalOwnerIDUsername: string
  Products: IProduct []
}
