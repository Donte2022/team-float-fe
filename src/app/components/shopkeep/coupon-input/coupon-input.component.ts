import {Component, Input, OnInit} from '@angular/core';
import {ICoupon} from "../../../interfaces/ICoupon";
import {ShopkeeperService} from "../../../services/shopkeeper.service";

@Component({
  selector: 'app-coupon-input',
  templateUrl: './coupon-input.component.html',
  styleUrls: ['./coupon-input.component.css']
})
export class CouponInputComponent implements OnInit {
  @Input() coupon: ICoupon = {
    id: 0,
    code: "",
    endDate: new Date(),
    startDate: new Date(),
    amount: 0,
    percentage: 0,
    useLimit: 0
  }

  private readonly CREATE_TEXT = "Create"
  private readonly UPDATE_TEXT = "Update"

  couponType: string = "amount"
  errMsg: string | null = null
  createOrUpdateText: string = this.CREATE_TEXT

  constructor(private shopkeeperService: ShopkeeperService) {
    shopkeeperService.$couponErrorMessage.subscribe(errMsg => this.errMsg = errMsg)
  }

  ngOnInit(): void {
    if (this.coupon.id === 0)
      this.createOrUpdateText = this.CREATE_TEXT
    else
      this.createOrUpdateText = this.UPDATE_TEXT
  }

  onClickCancel() {
    this.shopkeeperService.$isCreatingCoupon.next(false)
    this.shopkeeperService.$couponToEditId.next(null)
  }

  onClickSubmit() {
    this.shopkeeperService.createOrUpdate(this.coupon)
  }

}
