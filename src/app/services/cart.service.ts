import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {AccountService} from "./account.service";
import {IAccount} from "../interfaces/IAccount";
import {ICart} from "../interfaces/ICart";
import {first, Subject} from "rxjs";
import {IProduct} from "../interfaces/IProduct";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  account!: IAccount | null;
  cartProducts: ICart[] = []
  $cartProducts = new Subject<ICart[]>()
  $showCart = new Subject<boolean>()

  constructor(private http: HttpService, private accountService: AccountService) {
    this.accountService.$loggedIn.subscribe((value) => {
      this.onLogIn()
    })
  }


  onLogIn() {
    this.account = this.accountService.$account.getValue();
    if (this.account !== null) {
      this.http.get(`/cart/${this.account.id}/${this.account.orderId}`).subscribe(cartProducts => this.cartProducts = cartProducts)
    }
  }

  addFromProduct(product: IProduct, quantity: number) {

     if (!this.cartProducts.find(item => item.productId === product.id)) {

       if (this.account===undefined) {
         console.log("is the soDumb account")
         this.dummyAccountFromProduct(product, quantity)
         return
       } else
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
        this.http.post("/cart", newCartItem).subscribe(() => this.onLogIn())

      }
    } else {
      let index = this.cartProducts.findIndex((item) => item.productId === product.id)
      this.cartProducts[index].quantity += quantity
      this.http.put(`/cart/${this.cartProducts[index].cartId}`, this.cartProducts[index]).subscribe()
    }

  }


  updateFromCart(cartItem: ICart) {
    let index = this.cartProducts.findIndex(item => item.cartId === cartItem.cartId)
    this.cartProducts[index].quantity = cartItem.quantity
    this.http.put(`/cart/${cartItem.cartId}`, cartItem).subscribe()
  }

  removeProduct(cartId: number) {
    this.cartProducts = this.cartProducts.filter(item => item.cartId !== cartId)
    this.$cartProducts.next(this.cartProducts)
    this.http.delete(`/cart/${cartId}`).subscribe()
  }

  onCheckout() {
    this.cartProducts = []
    if (this.account !== null) {
      this.account.orderId += 1
      this.accountService.attemptUpdateAccount(this.account);
    }
    this.onLogIn()
  }

  dummyAccountFromProduct(product: IProduct, quantity: number) {
    if (!this.cartProducts.find(item => item.productId === product.id)) {
      if (this.account===undefined) {
        let newCartItem: ICart =
          {
            cartId: this.cartProducts.length,
            account: this.account,
            orderId: 1,
            productId: product.id,
            productName: product.productName,
            price: product.price,
            quantity: quantity,
          }

        this.cartProducts.push(newCartItem)
        console.log(this.cartProducts)
      } else {
        let index = this.cartProducts.findIndex((item) => item.productId === product.id)
        this.cartProducts[index].quantity += quantity
        console.log(this.cartProducts)
      }
    }
  }
  dummyAccountFromCart(cartItem: ICart) {
    let index = this.cartProducts.findIndex(item => item.cartId === cartItem.cartId)
    this.cartProducts[index].quantity = cartItem.quantity
  }
}
