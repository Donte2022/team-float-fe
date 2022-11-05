import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(private MainPageService: MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setProductCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
