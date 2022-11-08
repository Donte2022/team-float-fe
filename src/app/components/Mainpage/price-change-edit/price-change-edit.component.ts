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

}
