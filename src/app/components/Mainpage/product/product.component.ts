import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() Pro :IProduct | undefined

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
