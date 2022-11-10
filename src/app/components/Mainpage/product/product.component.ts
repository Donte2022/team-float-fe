import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {AccountService} from "../../../services/account.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() pro :IProduct | undefined
  img:string|undefined
  rank: number

  constructor(private accountService: AccountService, private mainPageService:MainPageService) {
    this.img = this.pro?.imageUrl
    this.rank = 0

  }

  ngOnInit(): void {
    if (this.pro?.imageUrl !== undefined) {
      this.img = this.pro.imageUrl
    }
    this.rank = this.accountService.userRank
  }

  onImageError () {
    console.error( this.pro?.imageUrl + " Invalid Image URL")
    this.img = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
  }

  onProductEdit () {
    if (this.pro !== undefined) {
      this.mainPageService.setIndProduct({...this.pro})
      this.mainPageService.setProductEditScreen(true)
      this.mainPageService.setProductScreen(false)
    }
  }
  onPriceChangeCreateScreen () {
    this.mainPageService.setPriceChangeCreateScreen(true)
    this.mainPageService.setProductScreen(false)
  }

  onDelete () {
    if (this.pro !== undefined) {
      this.mainPageService.deleteProduct(this.pro.id)
  }}

}
