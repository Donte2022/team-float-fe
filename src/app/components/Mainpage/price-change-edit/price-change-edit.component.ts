import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";
import {ICategory} from "../../../interfaces/ICategory";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-price-change-edit',
  templateUrl: './price-change-edit.component.html',
  styleUrls: ['./price-change-edit.component.css']
})
export class PriceChangeEditComponent implements OnInit {

  PriceChange : IPriceChange



  constructor(private MainPageService: MainPageService) {
    this.PriceChange = {} as IPriceChange

  }

  ngOnInit(): void {
    this.PriceChange = this.MainPageService.getIndPriceChange()
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
