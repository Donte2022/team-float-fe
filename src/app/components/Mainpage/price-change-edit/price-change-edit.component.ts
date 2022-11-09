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

  PriceChange : IPriceChange
  message : string
  sub : Subscription


  constructor(private MainPageService: MainPageService) {
    this.PriceChange = {} as IPriceChange
    this.message = ""
    this.sub = this.MainPageService.$PriceChangeEditMessage.subscribe(value => {this.message = value})
  }

  ngOnInit(): void {
    this.PriceChange = this.MainPageService.getIndPriceChange()
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
      id:this.PriceChange.id,sale:this.PriceChange.sale,newPrice:this.PriceChange.newPrice,
      startDate:this.PriceChange.startDate,endDate:this.PriceChange.endDate,couponLeft:this.PriceChange.couponLeft
    }
    )
    this.oncancel()
  }

}
