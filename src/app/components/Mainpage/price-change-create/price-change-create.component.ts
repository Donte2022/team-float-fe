import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-price-change-create',
  templateUrl: './price-change-create.component.html',
  styleUrls: ['./price-change-create.component.css']
})
export class PriceChangeCreateComponent implements OnInit {

  constructor(private mainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  onCancel () {
    this.mainPageService.setPriceChangeCreateScreen(false)
    this.mainPageService.setProductScreen(true)
  }
}
