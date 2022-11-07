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
  constructor(private MainPageService: MainPageService) {
    this.OtherCatList = [...this.MainPageService.getFullCategoryList()]
  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setProductCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
