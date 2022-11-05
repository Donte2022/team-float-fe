import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private MainPageService: MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setCategoryCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
