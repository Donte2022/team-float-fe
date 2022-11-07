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
  BasePrice: number
  ImageUrl: string
  Discontinued: boolean
  AvaliableOnDate: Date
  Weight: number
  MAPPrice: number
  CosttoMake: number




  constructor(private MainPageService: MainPageService) {
    this.OtherCatList = [...this.MainPageService.getFullCategoryList()]
    this.DisplayName = ""
    this.ProductName = ""
    this.Description = ""
    this.BasePrice = 0
    this.ImageUrl = ""
    this.Discontinued = false
    this.AvaliableOnDate = new Date()
    this.Weight = 0
    this.MAPPrice = 0
    this.CosttoMake = 0

  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setProductCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onpost () {
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
    )
    this.oncancel()
  }
}
