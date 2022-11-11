import {ICartProduct} from "./ICartProduct";
import {IAccount} from "./IAccount";

export interface ICart {

  cartId?: number
  account: IAccount;
  orderId: number

  productId: number
  productName: string
  price: number;

  quantity: number;

}
