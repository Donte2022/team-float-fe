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

  constructor(private MainPageService: MainPageService) {
    this.Category = {} as ICategory
    this.OtherProductList = []

  }

  ngOnInit(): void {
    this.Category = {...this.MainPageService.getIndCategory()}
    this.OtherProductList = [...this.MainPageService.getFullProductList()]
    this.filitarproductlist()
  }


  filitarproductlist () {
    this.OtherProductList = this.OtherProductList.filter(value => {return -1 ===
      this.Category.Products.findIndex(value1 => {return value1.ID === value.ID})
    }
    )}

  oncancel () {
    this.MainPageService.setCategoryEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
