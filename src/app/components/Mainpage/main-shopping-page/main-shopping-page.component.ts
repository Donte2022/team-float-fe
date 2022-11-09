import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-main-shopping-page',
  templateUrl: './main-shopping-page.component.html',
  styleUrls: ['./main-shopping-page.component.css']
})
export class MainShoppingPageComponent implements OnInit {

  catEditScreen: boolean = false
  catCreateScreen : boolean =false
  productCreateScreen: boolean = false
  productEditScreen: boolean = false
  priceChangeCreateScreen: boolean = false
  priceEditScreen  : boolean = false
  productScreen: boolean = true
  catList: ICategory []
  productList: IProduct []
  rank : number = 0

  constructor(private accountService: AccountService, private mainPageService: MainPageService) {
    this.catList= []
    this.productList = []
    this.mainPageService.$CategoryEditScreen.subscribe(value => {this.catEditScreen = value})
    this.mainPageService.$CategoryCreateScreen.subscribe(value => {this.catCreateScreen = value})
    this.mainPageService.$ProductCreateScreen.subscribe(value => {this.productCreateScreen = value})
    this.mainPageService.$ProductEditScreen.subscribe(value => {this.productEditScreen = value})
    this.mainPageService.$PriceChangeCreateScreen.subscribe(value => {this.priceChangeCreateScreen = value})
    this.mainPageService.$PriceChangeEditScreen.subscribe(value => {this.priceEditScreen = value})
    this.mainPageService.$ProductScreen.subscribe(value => {this.productScreen = value})
    this.mainPageService.$FullCategoryList.subscribe(value => {this.catList = value})
    this.mainPageService.$FullProductList.subscribe(value => {this.productList = [...value]})
  }

  ngOnInit(): void {
    this.mainPageService.getFullProductListRequest()
    this.mainPageService.getFullCategoryList()
    this.productList = [...this.mainPageService.getFullProductList()]
    this.productScreen = this.mainPageService.ProductScreen
    this.productCreateScreen = this.mainPageService.ProductCreateScreen
    this.rank = this.accountService.userRank
  }

  onCancel () {
    this.mainPageService.setMainShoppingPageScreen(false)
  }


  onCatCreate () {
    this.mainPageService.setCategoryCreateScreen(true)
    this.mainPageService.setProductScreen(false)

  }
}
