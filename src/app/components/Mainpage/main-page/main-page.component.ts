
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {ShopkeeperService} from "../../../services/shopkeeper.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  showAccountList: boolean = false
  showMyAccount: boolean = false
  showKeepShop: boolean = false

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private accountService: AccountService, private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService) {
    this.sub1 = this.accountService.$showAccountList.subscribe(showAccountList => this.showAccountList = showAccountList)
    this.sub2 = this.accountService.$showMyAccount.subscribe(showMyAccount => this.showMyAccount = showMyAccount)
    this.sub3 = this.shopkeeperService.$showShopkeepNav.subscribe(showKeepShop => this.showKeepShop = showKeepShop)
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  onShopping () {
    this.mainPageService.setMainShoppingPageScreen(true)
  }

}
