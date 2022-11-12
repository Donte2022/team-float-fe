import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainPageService} from "../../../services/main-page.service";
import {CartService} from "../../../services/cart.service";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";
import {ShopkeeperService} from "../../../services/shopkeeper.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {
  errorMsg: string | null = null
  isRegistering: boolean = false
  showLogin: boolean = false
  showManageAccounts: boolean = false
  showMyAccount: boolean = false
  showKeepShop: boolean = false
  showCart = false

  subs: Subscription[] = []

  constructor(private accountService: AccountService, private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService, private cartService: CartService) {
    this.subs[1] = accountService.$showManageAccounts.subscribe(showManageAccounts => this.showManageAccounts = showManageAccounts)
    this.subs[2] = accountService.$showMyAccount.subscribe(showMyAccount => this.showMyAccount = showMyAccount)
    this.subs[3] = shopkeeperService.$showShopkeepNav.subscribe(showKeepShop => this.showKeepShop = showKeepShop)
    this.subs[4] = cartService.$showCart.subscribe(value=>this.showCart = value)
    this.subs[5] = accountService.$showLogin.subscribe(showLogin => this.showLogin = showLogin)
    this.subs[6] = accountService.$isRegistering.subscribe(isRegistering => this.isRegistering = isRegistering)
    this.subs[7] = accountService.$loginErrorMessage.subscribe(errorMsg => this.errorMsg = errorMsg)
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe())
  }
}
