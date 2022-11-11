import {Component, Input, OnInit} from '@angular/core';
import {ICoupon} from "../../../interfaces/ICoupon";
import {ShopkeeperService} from "../../../services/shopkeeper.service";

@Component({
  selector: 'app-coupon-list-item',
  templateUrl: './coupon-list-item.component.html',
  styleUrls: ['./coupon-list-item.component.css']
})
export class CouponListItemComponent implements OnInit {
  @Input() coupon!: ICoupon

  constructor(private shopkeeperService: ShopkeeperService) { }

  ngOnInit(): void {
  }

  onClickEdit() {
    //Todo handle update
    console.log("Update")
    this.shopkeeperService.$couponToEditId.next(this.coupon.id)
  }

  onClickDelete(couponId: number) {
    this.shopkeeperService.attemptDelete(couponId)
  }

}
