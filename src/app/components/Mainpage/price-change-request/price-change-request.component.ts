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

  @Input() pri: IPriceChange | undefined
  @Input() pro: IProduct | undefined

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  dateFormat (input:boolean) {
    if (this.pri !== undefined){
      let day = new Date()
      if (input) {
        day = new Date(this.pri.startDate)
        return (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
      }
      else {
         day = new Date(this.pri.endDate)
        return (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
      }
    }
    return
  }

  onPriceChangeEditScreen () {
    if (this.pri !== undefined && this.pro !== undefined) {
      this.MainPageService.setIndPriceChange(this.pri)
      this.MainPageService.setIndProduct(this.pro)
      this.MainPageService.setPriceChangeEditScreen(true)
      this.MainPageService.setProductScreen(false)
    }
  }

  ondelete () {
    if (this.pro !== undefined && this.pri !== undefined) {
      this.MainPageService.deletePriceChange(this.pro.id,this.pri.id,this.pro)
    }
  }

}
