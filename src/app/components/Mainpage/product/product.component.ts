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
  img:String|undefined

  constructor(private MainPageService:MainPageService) {
    this.img = this.Pro?.Image

  }

  ngOnInit(): void {
    if (this.Pro?.Image !== undefined)
      this.img = this.Pro.Image
  }


  onimageerror () {
    this.img = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
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
