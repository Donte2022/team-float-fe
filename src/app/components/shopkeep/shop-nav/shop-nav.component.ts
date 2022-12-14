import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopkeeperService} from "../../../services/shopkeeper.service";
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shop-nav',
  templateUrl: './shop-nav.component.html',
  styleUrls: ['./shop-nav.component.css']
})
export class ShopNavComponent implements OnInit, OnDestroy {
  categoryToEditId: number | null = null
  isCreatingCategory: boolean = false
  showCategories: boolean = false
  showCouponList: boolean = false
  showProductCreate: boolean = false
  showProductList: boolean = true

  subs: Subscription[] = []

  fullList: ICategory [] = []

  constructor(private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService) {
    this.subs[1] = mainPageService.$mainShoppingpageScreen.subscribe(showProductList => this.showProductList = showProductList)
    this.subs[2] = mainPageService.$categoryCreatescreen.subscribe(showCategories => this.showCategories = showCategories)
    this.subs[3] = mainPageService.$productCreatescreen.subscribe(showProductCreate => this.showProductCreate = showProductCreate)
    this.subs[4] = mainPageService.$fullCategory.subscribe(value => {this.fullList = value})
    this.subs[5] = shopkeeperService.$showCouponList.subscribe(showCouponList => this.showCouponList = showCouponList)
    this.subs[6] = mainPageService.$categoryToEditId.subscribe(categoryToEditId => this.categoryToEditId = categoryToEditId)
    this.subs[7] = mainPageService.$isCreatingCategory.subscribe(isCreatingCategory => this.isCreatingCategory = isCreatingCategory)
  }


  ngOnInit(): void {
    this.fullList = [...this.mainPageService.getFullCategoryList()]
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
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

  onClickCreateCategory() {
    this.mainPageService.$isCreatingCategory.next(true)
  }

}
