import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  @Input() cat!: ICategory

  otherList: IProduct []
  category: ICategory
  producttoSubmit : IProduct []
  tempProduct : number | undefined
  message : string
  sub: Subscription


  constructor(private MainPageService: MainPageService) {
    this.category = {} as ICategory
    this.otherList = []
    this.producttoSubmit = []
    this.tempProduct = undefined
    this.message = ""
    this.sub = this.MainPageService.$categoryEditmessage.subscribe(value => {this.message = value})

  }

  ngOnInit(): void {
    this.category = {...this.MainPageService.getIndCategory()}
    this.otherList = [...this.MainPageService.getFullProductList()]
    this.filter()
  }

  filter () {
    for (let pro of this.otherList){
      if (-1 != pro.categories.findIndex(value => {return value.id == this.category.id})){
        this.producttoSubmit.push(pro)
        let num = this.otherList.findIndex(value => {return value.id == pro.id})
        this.otherList.splice(num,1)
      }
    }
  }

  oncancel () {
    this.MainPageService.setCategoryEditScreen(false)
    this.MainPageService.setProductScreen(true)
    this.MainPageService.$categoryToEditId.next(null)
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
      let num = this.otherList.findIndex(val => {return val.id == n})
      if (num === -1){
        return;
      }
      let data = {...this.otherList[num]}
      this.producttoSubmit.push(data)
      this.otherList.splice(num,1)
      this.tempProduct = undefined
    }}

  ondelete (input: IProduct) {
    let num = this.producttoSubmit.findIndex(value => {return value.id == input.id})
    let data = {...this.producttoSubmit[num]}
    this.otherList.push(data)
    this.producttoSubmit.splice(num,1)
  }


  onsubmit () {
    if (!this.category.name){
      this.message = "Input field is Blank"
      return
    }

    let proidList : number[] = []
    for (let num of this.producttoSubmit){
      proidList.push(num.id)
    }
    let oldlist : number[] = []
    for (let num2 of this.otherList){
      oldlist.push(num2.id)
    }
    this.MainPageService.putCategory({...{name:this.category.name,id:this.category.id,proidList:proidList}},oldlist)
    this.oncancel()
  }


}
