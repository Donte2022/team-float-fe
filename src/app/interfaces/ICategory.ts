import {IProduct} from "./IProduct";

export interface ICategory {
  iD:number
  name:string
  originalOwneridUsername: string
  Products: IProduct []
}
