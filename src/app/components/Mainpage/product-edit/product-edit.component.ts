import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit,OnDestroy {

  product: IProduct
  message : string
  sub : Subscription
  MAP : number
  confirmMessage: boolean

  constructor(private MainPageService: MainPageService) {
    this.product = {} as IProduct
    this.confirmMessage = false
    this.MAP = 0
    this.message = ""
   this.sub = this.MainPageService.$productEditmessage.subscribe(value => {this.message = value})

  }

  ngOnInit(): void {
    this.product = this.MainPageService.getIndProduct()
    this.MAP = this.MainPageService.getIndProduct().map
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setProductEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onsubmit (input: IProduct) {
    if (input.price < this.MAP){
      this.confirmMessage = true
    }
    else {
      this.MainPageService.putProduct(input)
      this.oncancel()
    }
  }

  confirm () {
    this.MainPageService.putProduct(this.product)
    this.oncancel()
  }

}
