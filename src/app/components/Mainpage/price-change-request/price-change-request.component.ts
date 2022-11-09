import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";
import {IProduct} from "../../../interfaces/IProduct";

@Component({
  selector: 'app-price-change-request',
  templateUrl: './price-change-request.component.html',
  styleUrls: ['./price-change-request.component.css']
})
export class PriceChangeRequestComponent implements OnInit {

  @Input() Pri: IPriceChange | undefined
  @Input() Pro: IProduct | undefined

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  onPriceChangeEditScreen () {
    if (this.Pri !== undefined && this.Pro !== undefined) {
      this.MainPageService.setIndPriceChange(this.Pri)
      this.MainPageService.setIndProduct(this.Pro)
      this.MainPageService.setPriceChangeEditScreen(true)
      this.MainPageService.setProductScreen(false)
    }
  }

  ondelete () {
    if (this.Pro !== undefined && this.Pri !== undefined) {
      this.MainPageService.deletePriceChange(this.Pro.id,this.Pri.id,this.Pro)
    }
  }

}
