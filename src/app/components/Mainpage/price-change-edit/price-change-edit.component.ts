import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-price-change-edit',
  templateUrl: './price-change-edit.component.html',
  styleUrls: ['./price-change-edit.component.css']
})
export class PriceChangeEditComponent implements OnInit,OnDestroy {

  priceChange : IPriceChange
  message : string
  sub : Subscription


  constructor(private MainPageService: MainPageService) {
    this.priceChange = {} as IPriceChange
    this.message = ""
    this.sub = this.MainPageService.$priceChangemessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.priceChange = this.MainPageService.getIndPriceChange()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  oncancel () {
    this.MainPageService.setPriceChangeEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

  onedit () {
    this.MainPageService.putPriceChange({
      id:this.priceChange.id,sale:this.priceChange.sale,newPrice:this.priceChange.newPrice,
      startDate:this.priceChange.startDate,endDate:this.priceChange.endDate,couponLeft:this.priceChange.couponLeft
    }
    )
    this.oncancel()
  }

}
