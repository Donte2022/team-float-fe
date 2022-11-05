import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private MainPageService: MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setProductEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

}
