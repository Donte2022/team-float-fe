import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {ICartProduct} from "../interfaces/ICartProduct";
import {AccountService} from "./account.service";
import {IAccount} from "../interfaces/IAccount";
import {ICart} from "../interfaces/ICart";
import {first, Observable} from "rxjs";
import {IProduct} from "../interfaces/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  account!: IAccount | null;
  cartProducts: ICart[] = []


  constructor(private http: HttpService, private accountService: AccountService) {
    this.accountService.$loggedIn.pipe(first()).subscribe((value) => {
      this.onLogIn()
      console.log("getting here at least" + value)
    })
  }


  onLogIn() {
    console.log("onLogin")
    console.log(this.accountService.$account.getValue())
    this.account = this.accountService.$account.getValue();
    if (this.account !== null) {
      this.http.onget(`/cart?id=${this.account.id}/${this.account.orderId}`).subscribe(cartProducts => this.cartProducts = cartProducts)
    }


  }

  addFromProduct(product: IProduct, quantity: number) {
    if (!this.cartProducts.find(item => item.productId === product.id)) {
      console.log("found something")
      if (this.account !== null) {
        let newCartItem: ICart =
          {
            accountId: this.account.id,
            orderId: this.account.orderId,

            productId: product.id,
            productName: product.productName,
            price: product.price,

            quantity: quantity,
          }
        this.cartProducts.push(newCartItem)
        this.http.onpost("/cart", newCartItem)
      }
    } else {
      console.log("did not find anything")
     let index = this.cartProducts.findIndex((item) => item.productId === product.id)
      this.cartProducts[index].quantity += quantity
      this.http.onput(`/cart/${this.cartProducts[index].cartId}`, this.cartProducts[index])
    }
  }


  updateFromCart(cartItem: ICart) {
   let index =  this.cartProducts.findIndex(item => item.cartId === cartItem.cartId)
    this.cartProducts[index].quantity = cartItem.quantity
    this.http.onput(`/cart/${cartItem.cartId}`,cartItem)
  }

  removeProduct(cartId: number) {
    this.cartProducts.filter(item => item.cartId!==cartId)
    this.http.ondelete(`/cart/${cartId}`)
  }
}
