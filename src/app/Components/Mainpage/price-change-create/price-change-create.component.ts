import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-price-change-create',
  templateUrl: './price-change-create.component.html',
  styleUrls: ['./price-change-create.component.css']
})
export class PriceChangeCreateComponent implements OnInit {

  constructor(private MainPageService:MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setPriceChangeCreateScreen(false)
    this.MainPageService.setProductScreen(true)
  }
}
