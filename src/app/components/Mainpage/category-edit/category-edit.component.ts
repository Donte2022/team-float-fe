import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {ICategory} from "../../../interfaces/ICategory";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  Category: ICategory

  constructor(private MainPageService: MainPageService) {
    this.Category = {} as ICategory
  }

  ngOnInit(): void {
    this.Category = this.MainPageService.getIndCategory()
  }

  oncancel () {
    this.MainPageService.setCategoryEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
