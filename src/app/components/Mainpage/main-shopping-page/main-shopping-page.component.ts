import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-main-shopping-page',
  templateUrl: './main-shopping-page.component.html',
  styleUrls: ['./main-shopping-page.component.css']
})
export class MainShoppingPageComponent implements OnInit {

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

  constructor(private MainPageService: MainPageService) {
    this.message = ""
    this.fullList= []
    this.productList = []
    this.MainPageService.$categoryEditscreen.subscribe(value => {this.categoryEdit = value})
    this.MainPageService.$categoryCreatescreen.subscribe(value => {this.categoryCreate = value})
    this.MainPageService.$productCreatescreen.subscribe(value => {this.productCreate = value})
    this.MainPageService.$productEditscreen.subscribe(value => {this.productEdit = value})
    this.MainPageService.$priceCreatescreen.subscribe(value => {this.priceCreate = value})
    this.MainPageService.$priceEditscreen.subscribe(value => {this.priceEdit = value})
    this.MainPageService.$productScreen.subscribe(value => {this.productScreen = value})
    this.MainPageService.$fullCategory.subscribe(value => {this.fullList = value})
    this.MainPageService.$fullProduct.subscribe(value => {this.productList = [...value]})
    this.MainPageService.$mainShoppingpageMessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.MainPageService.getFullProductListRequest()
    this.MainPageService.getFullCategoryListRequest()
    this.productList = [...this.MainPageService.getFullProductList()]
    this.fullList = [...this.MainPageService.getFullCategoryList()]
    this.rank = this.MainPageService.getrank()
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
