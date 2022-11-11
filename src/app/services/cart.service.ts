import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {ICartProduct} from "../interfaces/ICartProduct";
import {AccountService} from "./account.service";
import {IAccount} from "../interfaces/IAccount";
import {ICart} from "../interfaces/ICart";
import {first, Observable, Subject} from "rxjs";
import {IProduct} from "../interfaces/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  account!: IAccount | null;
  cartProducts: ICart[] = []
  $cartProducts = new Subject<ICart[]>()


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
      this.http.get(`/cart/${this.account.id}/${this.account.orderId}`).subscribe(cartProducts => this.cartProducts = cartProducts)
    }


  }

  addFromProduct(product: IProduct, quantity: number) {
    if (!this.cartProducts.find(item => item.productId === product.id)) {
      if (this.account !== null) {
        let newCartItem: ICart =
          {
            account: this.account,
            orderId: this.account.orderId,

            productId: product.id,
            productName: product.productName,
            price: product.price,

            quantity: quantity,
          }
        this.http.post("/cart", newCartItem).subscribe(()=>this.onLogIn())

      }
    } else {
     let index = this.cartProducts.findIndex((item) => item.productId === product.id)
      this.cartProducts[index].quantity += quantity
      console.log("inded:" + this.cartProducts[index].cartId)
      this.http.put(`/cart/${this.cartProducts[index].cartId}`, this.cartProducts[index]).subscribe()
    }
  }


  updateFromCart(cartItem: ICart) {
   let index =  this.cartProducts.findIndex(item => item.cartId === cartItem.cartId)
    this.cartProducts[index].quantity = cartItem.quantity
    this.http.put(`/cart/${cartItem.cartId}`,cartItem).subscribe()
  }

  removeProduct(cartId: number) {
    this.cartProducts = this.cartProducts.filter(item => item.cartId!==cartId)
    this.$cartProducts.next(this.cartProducts)
    this.http.delete(`/cart/${cartId}`).subscribe()


  }
}
