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
  productList: IProduct []
  rank : number = 0
  showCart: boolean = false
  message : string
  sub : Subscription []



  constructor(private MainPageService: MainPageService) {
    this.message = ""
    this.sub = []
    this.productList = []
    this.sub.push(this.MainPageService.$categoryEditscreen.subscribe(value => {this.categoryEdit = value}))
    this.sub.push(this.MainPageService.$categoryCreatescreen.subscribe(value => {this.categoryCreate = value}))
    this.sub.push(this.MainPageService.$productCreatescreen.subscribe(value => {this.productCreate = value}))
    this.sub.push(this.MainPageService.$productEditscreen.subscribe(value => {this.productEdit = value}))
    this.sub.push(this.MainPageService.$priceCreatescreen.subscribe(value => {this.priceCreate = value}))
    this.sub.push(this.MainPageService.$priceEditscreen.subscribe(value => {this.priceEdit = value}))
    this.sub.push(this.MainPageService.$productScreen.subscribe(value => {this.productScreen = value}))
    this.sub.push(this.MainPageService.$fullProduct.subscribe(value => {this.productList = [...value]}))
    this.sub.push(this.MainPageService.$mainShoppingpageMessage.subscribe(value => {this.message = value}))
  }

  ngOnInit(): void {
    this.MainPageService.getFullProductListRequest()
    this.MainPageService.getFullCategoryListRequest()
    this.productList = [...this.MainPageService.getFullProductList()]
  }

  ngOnDestroy() {
    for (let s of this.sub){
      s.unsubscribe()
    }
  }

  onCancel () {
    this.MainPageService.setMainShoppingPageScreen(false)
  }


  onCatCreate () {
    this.MainPageService.setCategoryCreateScreen(true)
    this.MainPageService.setProductScreen(false)

  }

  onProductCreate () {
    this.MainPageService.setProductCreateScreen(true)
    this.MainPageService.setProductScreen(false)

  }

  onCartClick() {
    this.showCart = true
  }

}
