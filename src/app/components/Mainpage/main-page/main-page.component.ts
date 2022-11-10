import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  shopingpageScreen : boolean = false

  constructor(private MainPageService: MainPageService) {
    this.MainPageService.$mainShoppingpageScreen.subscribe(value => {this.shopingpageScreen = value})
  }

  ngOnInit(): void {

  }

  onshopping () {
    this.MainPageService.setMainShoppingPageScreen(true)
  }

}
