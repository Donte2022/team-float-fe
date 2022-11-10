import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IProduct} from "../../../interfaces/IProduct";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-price-change-create',
  templateUrl: './price-change-create.component.html',
  styleUrls: ['./price-change-create.component.css']
})
export class PriceChangeCreateComponent implements OnInit ,OnDestroy{

  sale:boolean
  newPrice:number | undefined
  startDate : Date
  endDate : Date
  couponsleft: number
  pro : IProduct
  message : string
  sub : Subscription
  confirmMessage: boolean

  constructor(private MainPageService:MainPageService) {
    this.pro = {} as IProduct
    this.confirmMessage = false
    this.sale = false
    this.newPrice = undefined
    this.startDate = new Date()
    this.endDate = new Date()
    this.couponsleft = 0
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
    if (this.newPrice !== undefined && this.couponsleft !== undefined && this.pro !== undefined) {
      if (this.pro.map > this.newPrice) {
        
      }
    this.MainPageService.postPriceChange(
      {sale: this.sale, newPrice: this.newPrice,startDate:this.startDate,endDate:this.endDate,couponLeft:this.couponsleft}
      ,this.pro
    )
      this.oncancel()
  }
  }

  confirm(){
    if (this.newPrice !== undefined && this.couponsleft !== undefined && this.pro !== undefined) {
      this.MainPageService.postPriceChange(
        {sale: this.sale, newPrice: this.newPrice,startDate:this.startDate,endDate:this.endDate,couponLeft:this.couponsleft}
        ,this.pro
      )
      this.oncancel()
    }
  }
}
