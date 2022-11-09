import {Component, Input, OnInit} from '@angular/core';
import {ICategory} from "../../../interfaces/ICategory";
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() Cat:ICategory | undefined

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  oncatedit () {
    if (this.Cat !== undefined) {
      this.MainPageService.setProductScreen(false)
      this.MainPageService.setCategoryEditScreen(true)
      this.MainPageService.setIndCategory({...this.Cat},true)
    }
  }
  ondelete() {
    if (this.Cat !== undefined){
      this.MainPageService.deleteCategory(this.Cat.id)
    }
  }

}
