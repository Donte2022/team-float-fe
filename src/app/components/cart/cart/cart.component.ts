import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ICartProduct} from "../../../interfaces/ICartProduct";
import {CartService} from "../../../services/cart.service";
import {ICart} from "../../../interfaces/ICart";
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProductList: ICart[];


  subTotal: number = 0
  discount: number = 0
  tax: number = 0
  shipping: number = 0
  total: number = 0

   showCheckout:boolean = false
  constructor(private cartService: CartService, private mainService: MainPageService) {
    this.cartProductList = this.cartService.cartProducts
    this.updateTotals();
this.cartService.$cartProducts.subscribe(cartProducts=> this.cartProductList = cartProducts)  }

  updateTotals() {
    this.subTotal=0
    this.cartProductList = this.cartService.cartProducts
    for (let cartProduct of this.cartProductList) {
      let amount = cartProduct.price * cartProduct.quantity
      this.subTotal+=amount
    }
    this.tax = (this.subTotal*.07)
    this.shipping = 3;
    this.total = this.subTotal + this.tax + this.shipping
  }

  ngOnInit(): void {
    this.cartProductList = this.cartService.cartProducts
  }

  onCheckout() {
    this.showCheckout = true
    this.cartService.onCheckout()
  }



}
