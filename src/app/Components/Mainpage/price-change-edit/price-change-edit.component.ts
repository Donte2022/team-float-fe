import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-price-change-edit',
  templateUrl: './price-change-edit.component.html',
  styleUrls: ['./price-change-edit.component.css']
})
export class PriceChangeEditComponent implements OnInit {

  constructor(private MainPageService: MainPageService) { }

  ngOnInit(): void {
  }

  oncancel () {
    this.MainPageService.setPriceChangeEditScreen(false)
    this.MainPageService.setProductScreen(true)
  }

}
