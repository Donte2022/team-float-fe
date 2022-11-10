import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit,OnDestroy {

  displayName: string
  productName: string
  description: string
  basePrice: number | undefined
  imageUrl: string
  discontinued: boolean
  avaliableDate: Date
  weight: number | undefined
  MAP: number | undefined
  costtoMake: number | undefined
  message: string
  sub : Subscription

  constructor(private MainPageService: MainPageService) {
    this.message = ""
    this.displayName = ""
    this.productName = ""
    this.description = ""
    this.basePrice = undefined
    this.imageUrl = ""
    this.discontinued = false
    this.avaliableDate = new Date()
    this.weight = undefined
    this.MAP = undefined
    this.costtoMake = undefined
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
    if (this.basePrice && this.weight && this.MAP && this.costtoMake){
    this.MainPageService.postProduct(
      {productName: this.productName,
      displayName: this.displayName,
      description: this.description,
      price: this.basePrice,
      imageUrl: this.imageUrl,
      discontinued: this.discontinued,
      dateAvailable: this.avaliableDate,
      weight: this.weight,
      map: this.MAP,
      cost:this.costtoMake}
    )}
    this.oncancel()
  }
}
