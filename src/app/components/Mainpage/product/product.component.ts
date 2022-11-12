import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {CartService} from "../../../services/cart.service";
import {Subscription} from "rxjs";
import {AccountService} from "../../../services/account.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {


  @Input() Pro :IProduct | undefined
  img:string|undefined
  rank: number
  quantity: number = 1
  displayPrice : number
  sub : Subscription
  addedMessage: boolean = false
  sub2 : Subscription


  constructor(private MainPageService:MainPageService, private cartService: CartService,private accountService:AccountService) {
    this.addedMessage = false
    this.img = this.Pro?.imageUrl
    this.rank = 0
    this.displayPrice = 0
   this.sub = this.MainPageService.$displayprice.subscribe(value => {if (value.proid === this.Pro?.id){
       this.displayPrice = value.num;
    }})
   this.sub2 = this.accountService.$userRank.subscribe(value => {this.rank = value})
  }

  ngOnInit(): void {
    if (this.Pro?.imageUrl !== undefined) {
      this.img = this.Pro.imageUrl
      this.displayPrice = this.MainPageService.onpricerequest(this.Pro).num
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }

  dateFormat () {
    if (this.Pro !== undefined){
     let day = new Date(this.Pro.dateAvailable)
      console.log(day)
      return (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
    }
    return
  }

  onImageError () {
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
    if (this.Pro !== undefined) {
    this.MainPageService.setIndProduct(this.Pro)
    this.MainPageService.setPriceChangeCreateScreen(true)
    this.MainPageService.setProductScreen(false)
  }}

  onDelete () {
    if (this.Pro !== undefined) {
      this.MainPageService.deleteProduct(this.Pro.id)
  }
  }

  addToCart() {
    if (this.Pro!==undefined) {
      this.cartService.addFromProduct(this.Pro, this.quantity);
      this.addedMessage = true
    }
  }

}
