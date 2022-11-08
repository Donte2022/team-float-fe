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
  img:string|undefined
  rank: number


  constructor(private MainPageService:MainPageService) {
    this.img = this.Pro?.imageUrl
    this.rank = 0

  }

  ngOnInit(): void {
    if (this.Pro?.imageUrl !== undefined) {
      this.img = this.Pro.imageUrl
    }
    this.rank = this.MainPageService.getrank()
  }


  onimageerror () {
    console.error( this.Pro?.imageUrl + " Invaild Image URL")
    this.img = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
  }

  onProductEdit () {
    if (this.Pro !== undefined) {
      this.MainPageService.setIndProduct({...this.Pro})
      this.MainPageService.setProductEditScreen(true)
      this.MainPageService.setProductScreen(false)
    }
  }
  onPriceChangeCreateScreen () {
    this.MainPageService.setPriceChangeCreateScreen(true)
    this.MainPageService.setProductScreen(false)
  }

  ondelete () {
    if (this.Pro !== undefined) {
      this.MainPageService.deleteproduct(this.Pro.id)
  }}

}
