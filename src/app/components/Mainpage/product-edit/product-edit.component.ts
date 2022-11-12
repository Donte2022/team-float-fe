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
  confirmMessage: boolean

  constructor(private MainPageService: MainPageService) {
    this.product = {} as IProduct
    this.confirmMessage = false
    this.message = ""
   this.sub = this.MainPageService.$productEditmessage.subscribe(value => {this.message = value})

  }

  ngOnInit(): void {
    this.product = this.MainPageService.getIndProduct()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setProductEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onsubmit (input: IProduct) {
    if (input.price < input.map){
      this.confirmMessage = true
    }
    else {
      this.MainPageService.putProduct(input)
      this.oncancel()
    }
  }

  confirm () {
    if (!this.product.displayName){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.productName){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.description){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.price){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.imageUrl){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.dateAvailable){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.weight){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.map){
      this.message = "Input Field is blank"
      return;
    }
    if (!this.product.costToMake){
      this.message = "Input Field is blank"
      return;
    }
    this.MainPageService.putProduct(this.product)
    this.oncancel()
  }

}
