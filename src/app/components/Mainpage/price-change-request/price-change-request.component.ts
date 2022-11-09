import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";

@Component({
  selector: 'app-price-change-request',
  templateUrl: './price-change-request.component.html',
  styleUrls: ['./price-change-request.component.css']
})
export class PriceChangeRequestComponent implements OnInit {

  @Input() pri: IPriceChange | undefined

  constructor(private mainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  onPriceChangeEditScreen () {
    if (this.pri !== undefined) {
      this.mainPageService.setIndPriceChange(this.pri)
      this.mainPageService.setPriceChangeEditScreen(true)
      this.mainPageService.setProductScreen(false)
    }
  }

}
