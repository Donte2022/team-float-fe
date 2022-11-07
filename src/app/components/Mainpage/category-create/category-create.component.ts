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

  constructor(private MainPageService: MainPageService) {
    this.OtherProductList = [...this.MainPageService.getFullProductList()]
  }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setCategoryCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
