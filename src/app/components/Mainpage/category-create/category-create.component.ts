import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  otherProduct: IProduct []
  productList: IProduct []
  tempProduct: number | undefined
  name : string

  constructor(private MainPageService: MainPageService) {
    this.otherProduct = [...this.MainPageService.getFullProductList()]
    this.productList = []
    this.tempProduct = undefined
    this.name = ""
  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setCategoryCreateScreen(false)
    // this.MainPageService.setProductScreen(true)
    this.MainPageService.setMainShoppingPageScreen(true)
  }

  onproductselect (input:any) {
    this.tempProduct = input.target.value
  }

  onadd () {
    if (this.tempProduct === undefined){
      return;
    }
    else {
    let n = this.tempProduct
    let num = this.otherProduct.findIndex(val => {return val.id == n})
      if (num === -1){
        return;
      }
    let data = {...this.otherProduct[num]}
    this.productList.push(data)
    this.otherProduct.splice(num,1)
    this.tempProduct = undefined
  }}

  ondelete (input: IProduct) {
    let num = this.productList.findIndex(value => {return value.id == input.id})
    let data = {...this.productList[num]}
    this.otherProduct.push(data)
    this.productList.splice(num,1)
  }


  onsubmit () {
    let proidList : number[] = []
    for (let num of this.productList){
      proidList.push(num.id)
    }
    this.MainPageService.postCategory({
      name: this.name,proidList: proidList}
    )
    // this.oncancel()
  }
}
