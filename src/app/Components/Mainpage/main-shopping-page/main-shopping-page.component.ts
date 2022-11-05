import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

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

  constructor(private MainPageService: MainPageService) {
    this.MainPageService.$CategoryEditScreen.subscribe(value => {this.CateditScreen = value})
    this.MainPageService.$CategoryCreateScreen.subscribe(value => {this.CatCreateScreen = value})
    this.MainPageService.$ProductCreateScreen.subscribe(value => {this.ProductCreateScreen = value})
    this.MainPageService.$ProductEditScreen.subscribe(value => {this.ProductEditScreen = value})
    this.MainPageService.$PriceChangeCreateScreen.subscribe(value => {this.PriceChangeCreateScreen = value})
    this.MainPageService.$PriceChangeEditScreen.subscribe(value => {this.PriceEditScreen = value})
    this.MainPageService.$ProductScreen.subscribe(value => {this.ProductScreen = value})
  }

  ngOnInit(): void {
  }

  oncanel () {
    this.MainPageService.setMainShoppingPageScreen(false)
  }

  oncatedit () {
    this.MainPageService.setCategoryEditScreen(true)
    this.MainPageService.setProductScreen(false)
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
