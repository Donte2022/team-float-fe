import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  constructor(private MainPageService: MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setCategoryEditScreen(false)
    this.MainPageService.setProductScreen(true)

  }
}
