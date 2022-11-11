import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICoupon} from "../../../interfaces/ICoupon";
import {ShopkeeperService} from "../../../services/shopkeeper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit, OnDestroy {
  couponList: ICoupon[] = []
  couponToEditId: number | null = null
  isCreatingCoupon: boolean = false

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private shopkeeperService: ShopkeeperService) {
    this.sub1 = shopkeeperService.$couponList.subscribe(couponList => this.couponList = couponList)
    this.sub2 = shopkeeperService.$couponToEditId.subscribe(id => this.couponToEditId = id)
    this.sub3 = shopkeeperService.$isCreatingCoupon.subscribe(isCreatingCoupon => this.isCreatingCoupon = isCreatingCoupon)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  onClickCreateCoupon() {
    this.shopkeeperService.$isCreatingCoupon.next(true)
  }

}
