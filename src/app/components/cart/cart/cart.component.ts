import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {ICart} from "../../../interfaces/ICart";
import {ShopkeeperService} from "../../../services/shopkeeper.service";
import {ICoupon} from "../../../interfaces/ICoupon";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartProductList: ICart[];

  subTotal: number = 0
  couponCode: string = ""
  couponErrorMessage: string | null = null
  validCoupon: ICoupon | null = null
  discount: number = 0
  tax: number = 0
  shipping: number = 0
  total: number = 0
  showCheckout:boolean = false

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private cartService: CartService, private shopkeeperService: ShopkeeperService) {
    this.cartProductList = this.cartService.cartProducts
    this.updateTotals();
    this.sub1 = this.cartService.$cartProducts.subscribe(cartProducts=> this.cartProductList = cartProducts)
    this.sub2 = this.shopkeeperService.$couponRedeemErrorMessage.subscribe(redeemErrMsg => this.couponErrorMessage = redeemErrMsg)
    this.sub3 = this.shopkeeperService.$validCoupon.subscribe(validCoupon => this.validCoupon = validCoupon)
  }

  updateTotals() {
    console.log("updating totals")
    this.subTotal=0
    this.cartProductList = this.cartService.cartProducts
    for (let cartProduct of this.cartProductList) {
      let amount = cartProduct.price * cartProduct.quantity
      this.subTotal+=amount
    }
    this.tax = (this.subTotal*.07)
    if (this.subTotal > 50 || this.subTotal === 0)
      this.shipping = 0;
    else
      this.shipping = 9.99;
    this.total = this.subTotal + this.tax + this.shipping
  }

  ngOnInit(): void {
    this.cartProductList = this.cartService.cartProducts
    console.log(this.cartProductList)
    this.validateCoupon()
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }

  onCheckout() {
    this.showCheckout = true
  }

  onClickApplyCoupon() {
    this.shopkeeperService.attemptRedeemCoupon(this.couponCode)
  }

  validateCoupon() {
    if (this.validCoupon) {
      console.log("validating")
      const amount = this.validCoupon.amount
      const percentage = this.validCoupon.percentage
      if (amount && this.subTotal > amount) {
        this.discount = amount
        this.subTotal -= amount
      }
      if (amount && this.total < amount) {
        this.discount = this.subTotal
        this.subTotal = 0
      }
      if (percentage === 100) {
        this.discount = this.subTotal
        this.subTotal = 0
      }
      if (percentage < 100 && percentage > 0) {
        this.discount = this.subTotal * (percentage/100)
        this.subTotal -= this.discount
      }
    }
  }
}
