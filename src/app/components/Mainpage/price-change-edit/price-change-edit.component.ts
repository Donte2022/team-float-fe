import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";
import {Subscription} from "rxjs";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-price-change-edit',
  templateUrl: './price-change-edit.component.html',
  styleUrls: ['./price-change-edit.component.css']
})
export class PriceChangeEditComponent implements OnInit,OnDestroy {

  priceChange : IPriceChange
  message : string
  sub : Subscription
  confirmMessage: boolean
  pro : IProduct


  constructor(private MainPageService: MainPageService) {
    this.priceChange = {} as IPriceChange
    this.pro = {} as IProduct
    this.confirmMessage = false
    this.message = ""
    this.sub = this.MainPageService.$priceChangemessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.priceChange = this.MainPageService.getIndPriceChange()
    this.pro = this.MainPageService.getIndProduct()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setPriceChangeEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onedit () {
    if (this.priceChange.newPrice < this.pro.map) {
      this.confirmMessage = true
    }
    else {
      this.confirm()
  }
  }

  confirm () {

    if (!this.priceChange.newPrice){
      this.message = "Input Field is blank"
      return
    }
    if (!this.priceChange.endDate){
      this.message = "Input Field is blank"
      return
    }    if (!this.priceChange.startDate){
      this.message = "Input Field is blank"
      return
    }    if (!this.priceChange.couponLeft) {
      this.message = "Input Field is blank"
      return
    }
    this.MainPageService.putPriceChange({
        id:this.priceChange.id,sale:this.priceChange.sale,newPrice:this.priceChange.newPrice,
        startDate:this.priceChange.startDate,endDate:this.priceChange.endDate,couponLeft:this.priceChange.couponLeft
      }
    )
    this.oncancel()
  }

}
