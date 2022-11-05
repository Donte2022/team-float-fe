import { Component, OnInit } from '@angular/core';
import {MainPageService} from "../../../Service/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  ShopingpageScreen : boolean = false

  constructor(private MainPageService: MainPageService) {
    this.MainPageService.$MainShoppingPageScreen.subscribe(value => {this.ShopingpageScreen = value})
  }

  ngOnInit(): void {
  }

  onshopping () {
    this.MainPageService.setMainShoppingPageScreen(true)
  }

}
