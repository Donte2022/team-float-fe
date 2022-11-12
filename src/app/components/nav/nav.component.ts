import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {MainPageService} from "../../services/main-page.service";
import {ShopkeeperService} from "../../services/shopkeeper.service";
import {CartService} from "../../services/cart.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRank: number = 4

  sub1: Subscription

  constructor(private accountService: AccountService, private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService, private cartService: CartService) {
    this.sub1 = accountService.$userRank.subscribe(userRank => this.userRank = userRank)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
  }

  onClickMyAccount() {
    this.accountService.$accountIdToEdit.next(null)
    this.accountService.$showMyAccount.next(true)
    this.accountService.$showManageAccounts.next(false)
    this.shopkeeperService.$showShopkeepNav.next(false)
    this.cartService.$showCart.next(false)
  }

  onClickManageAccounts() {
    this.accountService.$showManageAccounts.next(true)
    this.accountService.$showAccountList.next(true)
    this.accountService.$showMyAccount.next(false)
    this.shopkeeperService.$showShopkeepNav.next(false)
    this.cartService.$showCart.next(false)

  }

  onClickLogin() {
    this.accountService.$showLogin.next(true)
    this.cartService.$showCart.next(false)
  }

  onClickLogout() {
    this.accountService.resetAccountState()
  }

  onClickKeepShop() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$showManageAccounts.next(false)
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(true)
    this.shopkeeperService.$showShopkeepNav.next(true)
    this.cartService.$showCart.next(false)

  }

  onClickShopName() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$showManageAccounts.next(false)
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(true)
    this.shopkeeperService.$showShopkeepNav.next(false)
    this.cartService.$showCart.next(false)
    this.accountService.$showLogin.next(false)

  }

  onClickCart() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$showManageAccounts.next(false)
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(false)
    this.shopkeeperService.$showCouponList.next(false)
    this.cartService.$showCart.next(true)
    this.accountService.$showLogin.next(false)


  }

}
