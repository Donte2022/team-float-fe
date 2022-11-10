import {ICartProduct} from "./ICartProduct";

export interface ICart {

  cartId?: number
  accountId: number;
  orderId: number

  productId: number
  productName: string
  price: number;

  quantity: number;

}
