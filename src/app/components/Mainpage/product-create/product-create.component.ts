import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {Subscription} from "rxjs";
import {IProduct} from "../../../interfaces/IProduct";
import {ShopkeeperService} from "../../../services/shopkeeper.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit,OnDestroy {

  pro : IProduct
  message: string
  sub : Subscription
  confirmMessage: boolean

  constructor(private MainPageService: MainPageService,private shopkeeperService:ShopkeeperService) {
    this.pro = {} as IProduct
    this.message = ""
    this.confirmMessage = false
   this.sub = this.MainPageService.$productCreatemessage.subscribe(value => {this.message = value})

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setCategoryCreateScreen(false)
    this.MainPageService.setMainShoppingPageScreen(true)
    this.MainPageService.setProductCreateScreen(false)
    this.shopkeeperService.$showCouponList.next(false)
  }

  onpost () {
    if (this.pro.price < this.pro.map){
      this.confirmMessage =true
    }
    else {
      this.confirm()
    }
  }


  confirm () {

    if (!this.pro.displayName){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.productName){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.description){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.price){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.imageUrl){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.dateAvailable){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.weight){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.map){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.pro.costToMake){
      this.message = "Input Field is blank"
      return;
    }


    this.MainPageService.postProduct(
      {productName: this.pro.productName,
        displayName: this.pro.displayName,
        description: this.pro.description,
        price: this.pro.price,
        imageUrl: this.pro.imageUrl,
        discontinued: this.pro.discontinued,
        dateAvailable: this.pro.dateAvailable,
        weight: this.pro.weight,
        map: this.pro.map,
        cost:this.pro.costToMake
      })
    this.MainPageService.$mainShoppingpageScreen.next(true)
    this.oncancel()
  }
}
