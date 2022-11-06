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
    this.MainPageService.setCategoryEditScreen(true)
    this.MainPageService.setProductScreen(false)
  }

}
