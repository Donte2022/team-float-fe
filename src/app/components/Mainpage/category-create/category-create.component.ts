import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  OtherProductList: IProduct []
  ListOfProductToAdd: IProduct []
  TempProduct: number | undefined
  Name : string

  constructor(private MainPageService: MainPageService) {
    this.OtherProductList = [...this.MainPageService.getFullProductList()]
    this.ListOfProductToAdd = []
    this.TempProduct = undefined
    this.Name = ""
  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setCategoryCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onproductselect (input:any) {
    this.TempProduct = input.target.value
    console.log(this.TempProduct)
  }

  onadd () {
    if (this.TempProduct === undefined){
      return;
    }
    else {
    let n = this.TempProduct
    let num = this.OtherProductList.findIndex(val => {return val.id == n})
      if (num === -1){
        return;
      }
    let data = {...this.OtherProductList[num]}
    this.ListOfProductToAdd.push(data)
    this.OtherProductList.splice(num,1)
    this.TempProduct = undefined
  }}

  ondelete (input: IProduct) {
    let num = this.ListOfProductToAdd.findIndex(value => {return value.id == input.id})
    let data = {...this.ListOfProductToAdd[num]}
    this.OtherProductList.push(data)
    this.ListOfProductToAdd.splice(num,1)
  }


  onsubmit () {
    let proidList : number[] = []
    for (let num of this.ListOfProductToAdd){
      proidList.push(num.id)
    }
    this.MainPageService.postCategory({
      name: this.Name,proidList: proidList}
    )
    this.oncancel()
  }
}
