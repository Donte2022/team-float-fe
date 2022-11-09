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

  Sale:boolean
  NewPrice:number | undefined
  StartDate : Date
  EndDate : Date
  couponsleft: number
  Indpro : IProduct
  message : string
  sub : Subscription

  constructor(private MainPageService:MainPageService) {
    this.Indpro = {} as IProduct
    this.Sale = false
    this.NewPrice = undefined
    this.StartDate = new Date()
    this.EndDate = new Date()
    this.couponsleft = 0
    this.message = ""
   this.sub = this.MainPageService.$PriceChangeCreateMessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.Indpro = this.MainPageService.getIndProduct()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setPriceChangeCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  oncreate () {
    if (this.NewPrice !== undefined && this.couponsleft !== undefined && this.Indpro !== undefined) {
    this.MainPageService.postPriceChange(
      {sale: this.Sale, newPrice: this.NewPrice,startDate:this.StartDate,endDate:this.EndDate,couponLeft:this.couponsleft}
      ,this.Indpro.id
    )
      this.oncancel()
  }}
}
