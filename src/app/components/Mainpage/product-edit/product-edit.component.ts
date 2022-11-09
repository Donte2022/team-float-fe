import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {ICategory} from "../../../interfaces/ICategory";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: IProduct
  currentCatList : ICategory []
  otherCatList : ICategory []


  constructor(private mainPageService: MainPageService) {
    this.product = {} as IProduct
    this.currentCatList = []
    this.otherCatList = []

  }

  ngOnInit(): void {
    this.product = this.mainPageService.getIndProduct()
    this.otherCatList = [...this.mainPageService.getFullCategoryList()]
    console.log(this.product)
  }

  // filter () {
  //   this.currentCatList = [...this.otherCatList.filter(value => { return -1 === value.products.findIndex(value1 => {return value1.ID !== this.product.ID })})]
  //   this.otherCatList = [...this.otherCatList.filter(value => { return -1 === value.products.findIndex(value1 => {return value1.ID === this.product.ID })})]
  // }


  onCancel () {
    this.mainPageService.setProductEditScreen(false)
    this.mainPageService.setProductScreen(true)
  }

  onSubmit (input: IProduct) {
    this.mainPageService.putProduct(input)
    this.onCancel()
  }
}
