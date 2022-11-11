import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {Subscription} from "rxjs";
import {IPriceChange} from "../../../interfaces/IPriceChange";

@Component({
  selector: 'app-price-change-create',
  templateUrl: './price-change-create.component.html',
  styleUrls: ['./price-change-create.component.css']
})
export class PriceChangeCreateComponent implements OnInit ,OnDestroy{


  pro : IProduct
  pri : IPriceChange
  message : string
  sub : Subscription
  confirmMessage: boolean

  constructor(private MainPageService:MainPageService) {
    this.pro = {} as IProduct
    this.pri = {} as IPriceChange
    this.confirmMessage = false
    this.message = ""
   this.sub = this.MainPageService.$priceCreatemessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.pro = this.MainPageService.getIndProduct()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setPriceChangeCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  oncreate () {
      if (this.pro.map > this.pri.newPrice) {
        this.confirmMessage = true
      } else {
        this.confirm()
      }
  }

  confirm(){
    this.MainPageService.postPriceChange(
      {
        sale: this.pri.sale,
        newPrice: this.pri.newPrice,
        startDate: this.pri.startDate,
        endDate: this.pri.endDate,
        couponLeft: this.pri.couponLeft
      }
      , this.pro
    )
    this.oncancel()
  }
}
