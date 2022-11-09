import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  OtherProductList: IProduct []
  Category: ICategory
  ListOfProducttoSubmit : IProduct []
  TempProduct : number | undefined


  constructor(private MainPageService: MainPageService) {
    this.Category = {} as ICategory
    this.OtherProductList = []
    this.ListOfProducttoSubmit = []
    this.TempProduct = undefined
  }

  ngOnInit(): void {
    this.Category = {...this.MainPageService.getIndCategory()}
    this.OtherProductList = [...this.MainPageService.getFullProductList()]
    this.fillitarprodut()
  }

  fillitarprodut () {
    for (let pro of this.OtherProductList){
      if (-1 != pro.categories.findIndex(value => {return value.id == this.Category.id})){
        this.ListOfProducttoSubmit.push(pro)
        let num = this.OtherProductList.findIndex(value => {return value.id == pro.id})
        this.OtherProductList.splice(num,1)
      }
    }
  }

  oncancel () {
    this.MainPageService.setCategoryEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onproductselect (input:any) {
    this.TempProduct = input.target.value
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
      this.ListOfProducttoSubmit.push(data)
      this.OtherProductList.splice(num,1)
      this.TempProduct = undefined
    }}

  ondelete (input: IProduct) {
    let num = this.ListOfProducttoSubmit.findIndex(value => {return value.id == input.id})
    let data = {...this.ListOfProducttoSubmit[num]}
    this.OtherProductList.push(data)
    this.ListOfProducttoSubmit.splice(num,1)
  }


  onsubmit () {
    let proidList : number[] = []
    for (let num of this.ListOfProducttoSubmit){
      proidList.push(num.id)
    }
    let oldlist : number[] = []
    for (let num2 of this.OtherProductList){
      oldlist.push(num2.id)
    }
    this.MainPageService.putCategory({...{name:this.Category.name,id:this.Category.id,proidList:proidList}},oldlist)
    this.oncancel()
  }


}
