import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-price-change-request',
  templateUrl: './price-change-request.component.html',
  styleUrls: ['./price-change-request.component.css']
})
export class PriceChangeRequestComponent implements OnInit {

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  onPriceChangeEditScreen () {
    this.MainPageService.setPriceChangeEditScreen(true)
    this.MainPageService.setProductScreen(false)
  }

}
