import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";
import {ICategory} from "../../../interfaces/ICategory";

@Component({
  selector: 'app-price-change-edit',
  templateUrl: './price-change-edit.component.html',
  styleUrls: ['./price-change-edit.component.css']
})
export class PriceChangeEditComponent implements OnInit {

  priceChange : IPriceChange


  constructor(private mainPageService: MainPageService) {
    this.priceChange = {} as IPriceChange
  }

  ngOnInit(): void {
    this.priceChange = this.mainPageService.getIndPriceChange()
  }
  onCancel () {
    this.mainPageService.setPriceChangeEditScreen(false)
    this.mainPageService.setProductScreen(true)
  }

}
