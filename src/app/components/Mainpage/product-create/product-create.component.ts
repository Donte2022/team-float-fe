import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  otherCatList : ICategory []

  displayName: string
  productName: string
  description: string
  basePrice: number | undefined
  imageUrl: string
  discontinued: boolean
  availableOnDate: Date
  weight: number | undefined
  mapPrice: number | undefined
  costToMake: number | undefined

  constructor(private mainPageService: MainPageService) {
    this.otherCatList = [...this.mainPageService.getFullCategoryList()]
    this.displayName = ""
    this.productName = ""
    this.description = ""
    this.basePrice = undefined
    this.imageUrl = ""
    this.discontinued = false
    this.availableOnDate = new Date()
    this.weight = undefined
    this.mapPrice = undefined
    this.costToMake = undefined

  }

  ngOnInit(): void {
  }

  onCancel () {
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(true)
  }

  onPost () {
    if (this.basePrice && this.weight && this.mapPrice && this.costToMake){
    this.mainPageService.postProduct(
      {productName: this.productName,
      displayName: this.displayName,
      description: this.description,
      price: this.basePrice,
      imageUrl: this.imageUrl,
      discontinued: this.discontinued,
      dateAvailable: this.availableOnDate,
      weight: this.weight,
      map: this.mapPrice,
      cost:this.costToMake}
    )}
    this.onCancel()
  }
}
