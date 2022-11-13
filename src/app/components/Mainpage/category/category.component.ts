import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from "../../../interfaces/ICategory";
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() cat:ICategory | undefined

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  oncatedit () {
    if (this.cat !== undefined) {
      this.MainPageService.setProductScreen(false)
      this.MainPageService.setCategoryEditScreen(true)
      this.MainPageService.setIndCategory({...this.cat})
      this.MainPageService.$categoryToEditId.next(this.cat.id)
    }
  }
  ondelete() {
    if (this.cat !== undefined){
      this.MainPageService.deleteCategory(this.cat.id)
    }
  }

}
