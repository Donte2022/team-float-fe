import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {IPriceChange} from "../../../interfaces/IPriceChange";

@Component({
  selector: 'app-price-change-request',
  templateUrl: './price-change-request.component.html',
  styleUrls: ['./price-change-request.component.css']
})
export class PriceChangeRequestComponent implements OnInit {

  @Input() Pri: IPriceChange | undefined

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  onPriceChangeEditScreen () {
    if (this.Pri !== undefined) {
      this.MainPageService.setIndPriceChange(this.Pri)
      this.MainPageService.setPriceChangeEditScreen(true)
      this.MainPageService.setProductScreen(false)
    }
  }

}
