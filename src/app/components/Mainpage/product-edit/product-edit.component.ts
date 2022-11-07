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

  Product: IProduct
  CurrentCatList : ICategory []
  OtherCatList : ICategory []

  constructor(private MainPageService: MainPageService) {
    this.Product = {} as IProduct
    this.CurrentCatList = []
    this.OtherCatList = []
  }

  ngOnInit(): void {
    this.Product = this.MainPageService.getIndProduct()
    this.OtherCatList = [...this.MainPageService.getFullCategoryList()]
    this.filiter()
  }

  filiter () {
    this.CurrentCatList = [...this.OtherCatList.filter(value => { return -1 === value.Products.findIndex(value1 => {return value1.ID !== this.Product.ID })})]
    this.OtherCatList = [...this.OtherCatList.filter(value => { return -1 === value.Products.findIndex(value1 => {return value1.ID === this.Product.ID })})]
  }


  oncancel () {
    this.MainPageService.setProductEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

}
