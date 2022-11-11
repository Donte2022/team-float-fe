import { Component, OnInit } from '@angular/core';
import {ShopkeeperService} from "../../../services/shopkeeper.service";
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-shop-nav',
  templateUrl: './shop-nav.component.html',
  styleUrls: ['./shop-nav.component.css']
})
export class ShopNavComponent implements OnInit {
  showCategories: boolean = false
  showCouponList: boolean = false
  showProductCreate: boolean = false
  showProductList: boolean = true

  constructor(private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService) {
    mainPageService.$mainShoppingpageScreen.subscribe(showProductList => this.showProductList = showProductList)
    mainPageService.$categoryCreatescreen.subscribe(showCategories => this.showCategories = showCategories)
    mainPageService.$productCreatescreen.subscribe(showProductCreate => this.showProductCreate = showProductCreate)
    shopkeeperService.$showCouponList.subscribe(showCouponList => this.showCouponList = showCouponList)
  }

  ngOnInit(): void {
  }

  onClickCategories() {
    this.mainPageService.setCategoryCreateScreen(true)
    this.mainPageService.setMainShoppingPageScreen(false)
    this.mainPageService.setProductCreateScreen(false)
    this.shopkeeperService.$showCouponList.next(false)
  }

  onClickCreateProduct () {
    this.mainPageService.setCategoryCreateScreen(false)
    this.mainPageService.setMainShoppingPageScreen(false)
    this.mainPageService.setProductCreateScreen(true)
    this.shopkeeperService.$showCouponList.next(false)

  }

  onClickProductList() {
    this.mainPageService.setCategoryCreateScreen(false)
    this.mainPageService.setMainShoppingPageScreen(true)
    this.mainPageService.setProductCreateScreen(false)
    this.shopkeeperService.$showCouponList.next(false)
  }

  onClickCoupons() {
    this.mainPageService.setCategoryCreateScreen(false)
    this.mainPageService.setMainShoppingPageScreen(false)
    this.mainPageService.setProductCreateScreen(false)
    this.shopkeeperService.$showCouponList.next(true)
  }

}
