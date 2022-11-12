import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {Subscription} from "rxjs";
import {IProduct} from "../../../interfaces/IProduct";

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

  constructor(private MainPageService: MainPageService) {
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
    this.MainPageService.setProductCreateScreen(false)
    this.MainPageService.setProductScreen(true)
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
        costToMake:this.pro.costToMake
      })
    this.MainPageService.$mainShoppingpageScreen.next(true)
    this.oncancel()
  }
}
