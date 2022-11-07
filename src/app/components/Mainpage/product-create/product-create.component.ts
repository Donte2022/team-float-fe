import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  OtherCatList : ICategory []

  DisplayName: string
  ProductName: string
  Description: string
  BasePrice: number | undefined
  ImageUrl: string
  Discontinued: boolean
  AvaliableOnDate: Date
  Weight: number | undefined
  MAPPrice: number | undefined
  CosttoMake: number | undefined




  constructor(private MainPageService: MainPageService) {
    this.OtherCatList = [...this.MainPageService.getFullCategoryList()]
    this.DisplayName = ""
    this.ProductName = ""
    this.Description = ""
    this.BasePrice = undefined
    this.ImageUrl = ""
    this.Discontinued = false
    this.AvaliableOnDate = new Date()
    this.Weight = undefined
    this.MAPPrice = undefined
    this.CosttoMake = undefined

  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setProductCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onpost () {
    if (this.BasePrice && this.Weight && this.MAPPrice && this.CosttoMake){
    this.MainPageService.postproduct(
      {productName: this.ProductName,
      displayName: this.DisplayName,
      description: this.Description,
      price: this.BasePrice,
      imageUrl: this.ImageUrl,
      discontinued: this.Discontinued,
      dateAvailable: this.AvaliableOnDate,
      weight: this.Weight,
      map: this.MAPPrice,
      cost:this.CosttoMake}
    )}
    this.oncancel()
  }
}
