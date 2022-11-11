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

  sub1: Subscription

  constructor(private shopkeeperService: ShopkeeperService) {
    this.sub1 = shopkeeperService.$couponList.subscribe(couponList => this.couponList = couponList)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
  }

}
