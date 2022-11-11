import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {MainPageService} from "../../services/main-page.service";
import {ShopkeeperService} from "../../services/shopkeeper.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRank: number = 3

  constructor(private accountService: AccountService, private mainPageService: MainPageService, private shopkeeperService: ShopkeeperService) {
  }

  ngOnInit(): void {
    this.userRank = this.accountService.userRank
  }

  onClickMyAccount() {
    this.accountService.$accountIdToEdit.next(null)
    this.accountService.$showMyAccount.next(true)
    this.accountService.$showAccountList.next(false)
    this.shopkeeperService.$showShopkeepNav.next(false)
  }

  onClickManageAccounts() {
    this.accountService.$showAccountList.next(true)
    this.accountService.$showMyAccount.next(false)
    this.shopkeeperService.$showShopkeepNav.next(false)
  }

  onClickLogout() {
    this.accountService.resetAccountState()
  }

  onClickKeepShop() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$showAccountList.next(false)
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(true)
    this.shopkeeperService.$showShopkeepNav.next(true)
  }

  onClickShopName() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$showAccountList.next(false)
    this.mainPageService.setProductCreateScreen(false)
    this.mainPageService.setProductScreen(true)
    this.shopkeeperService.$showShopkeepNav.next(false)
  }

}
