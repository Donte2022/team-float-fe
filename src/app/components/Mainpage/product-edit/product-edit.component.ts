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

  Product: IProduct
  message : string
  sub : Subscription

  constructor(private MainPageService: MainPageService) {
    this.Product = {} as IProduct
    this.message = ""
   this.sub = this.MainPageService.$ProductEditMessage.subscribe(value => {this.message = value})

  }

  ngOnInit(): void {
    this.Product = this.MainPageService.getIndProduct()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setProductEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onsubmit (input: IProduct) {
    this.MainPageService.putProduct(input)
    this.oncancel()
  }

}
