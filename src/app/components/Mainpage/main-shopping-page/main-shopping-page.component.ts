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

  CateditScreen: boolean = false
  CatCreateScreen : boolean =false
  ProductCreateScreen: boolean = false
  ProductEditScreen: boolean = false
  PriceChangeCreateScreen: boolean = false
  PriceEditScreen  : boolean = false
  ProductScreen: boolean = true
  CatFulllist: ICategory []
  ProductFulllist: IProduct []
  rank : number = 0

  constructor(private MainPageService: MainPageService) {
    this.CatFulllist= []
    this.ProductFulllist = []
    this.MainPageService.$CategoryEditScreen.subscribe(value => {this.CateditScreen = value})
    this.MainPageService.$CategoryCreateScreen.subscribe(value => {this.CatCreateScreen = value})
    this.MainPageService.$ProductCreateScreen.subscribe(value => {this.ProductCreateScreen = value})
    this.MainPageService.$ProductEditScreen.subscribe(value => {this.ProductEditScreen = value})
    this.MainPageService.$PriceChangeCreateScreen.subscribe(value => {this.PriceChangeCreateScreen = value})
    this.MainPageService.$PriceChangeEditScreen.subscribe(value => {this.PriceEditScreen = value})
    this.MainPageService.$ProductScreen.subscribe(value => {this.ProductScreen = value})
    this.MainPageService.$FullCategoryList.subscribe(value => {this.CatFulllist = value})
    this.MainPageService.$FullProductList.subscribe(value => {this.ProductFulllist = [...value]})
  }

  ngOnInit(): void {
    this.MainPageService.getFullProductListRequest()
    this.MainPageService.getFullCategoryListRequest()
    this.ProductFulllist = [...this.MainPageService.getFullProductList()]
    this.CatFulllist = [...this.MainPageService.getFullCategoryList()]
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
