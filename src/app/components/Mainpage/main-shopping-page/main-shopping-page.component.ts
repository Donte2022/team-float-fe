import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-shopping-page',
  templateUrl: './main-shopping-page.component.html',
  styleUrls: ['./main-shopping-page.component.css']
})
export class MainShoppingPageComponent implements OnInit,OnDestroy{

  categoryEdit: boolean = false
  categoryCreate : boolean =false
  productCreate: boolean = false
  productEdit: boolean = false
  priceCreate: boolean = false
  priceEdit  : boolean = false
  productScreen: boolean = true
  fullList: ICategory []
  productList: IProduct []
  rank : number = 0
  message : string
  sub : Subscription
  sub2 : Subscription
  sub3 : Subscription
  sub4 : Subscription
  sub5 : Subscription
  sub6 : Subscription
  sub7 : Subscription
  sub8 : Subscription
  sub9 : Subscription
  sub10 : Subscription



  constructor(private MainPageService: MainPageService) {
    this.message = ""
    this.fullList= []
    this.productList = []
  this.sub =  this.MainPageService.$categoryEditscreen.subscribe(value => {this.categoryEdit = value})
  this.sub2 =  this.MainPageService.$categoryCreatescreen.subscribe(value => {this.categoryCreate = value})
  this.sub3 =  this.MainPageService.$productCreatescreen.subscribe(value => {this.productCreate = value})
  this.sub4 =  this.MainPageService.$productEditscreen.subscribe(value => {this.productEdit = value})
  this.sub5 =  this.MainPageService.$priceCreatescreen.subscribe(value => {this.priceCreate = value})
  this.sub6 =  this.MainPageService.$priceEditscreen.subscribe(value => {this.priceEdit = value})
  this.sub7 =  this.MainPageService.$productScreen.subscribe(value => {this.productScreen = value})
  this.sub8 =  this.MainPageService.$fullCategory.subscribe(value => {this.fullList = value})
  this.sub9 = this.MainPageService.$fullProduct.subscribe(value => {this.productList = [...value]})
  this.sub10 = this.MainPageService.$mainShoppingpageMessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.MainPageService.getFullProductListRequest()
    this.MainPageService.getFullCategoryListRequest()
    this.productList = [...this.MainPageService.getFullProductList()]
    this.fullList = [...this.MainPageService.getFullCategoryList()]
    this.rank = this.MainPageService.getrank()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    this.sub4.unsubscribe()
    this.sub5.unsubscribe()
    this.sub6.unsubscribe()
    this.sub7.unsubscribe()
    this.sub8.unsubscribe()
    this.sub9.unsubscribe()
    this.sub10.unsubscribe()
  }

  oncanel () {
    this.MainPageService.setMainShoppingPageScreen(false)
  }


  oncatcreate () {
    this.MainPageService.setCategoryCreateScreen(true)
    this.MainPageService.setProductScreen(false)

  }

  onproductcreate () {
    this.MainPageService.setProductCreateScreen(true)
    this.MainPageService.setProductScreen(false)

  }

}
