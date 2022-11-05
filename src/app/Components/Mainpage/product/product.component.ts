import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  constructor(private MainPageService:MainPageService) {
  }

  ngOnInit(): void {
  }

  onProductEdit () {
    this.MainPageService.setProductEditScreen(true)
    this.MainPageService.setProductScreen(false)
  }
  onPriceChangeCreateScreen () {
    this.MainPageService.setPriceChangeCreateScreen(true)
    this.MainPageService.setProductScreen(false)
  }

}
