import {Component, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy {
  accountList: IAccount[] = []
  accountToEditId: number | null = null
  showAccountList: boolean = false
  showAddAccount: boolean = false

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription
  sub4: Subscription

  constructor(private accountService: AccountService) {
    this.sub1 = accountService.$accountList.subscribe(
      accountList => this.accountList = accountList
    )
    this.sub2 = accountService.$accountIdToEdit.subscribe(
      accountToEditId => this.accountToEditId = accountToEditId)
    this.sub3 = accountService.$showAddAccount.subscribe(
      showAddAccount => this.showAddAccount = showAddAccount
    )
    this.sub4 = accountService.$showAccountList.subscribe(showAccountList => this.showAccountList = showAccountList)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    this.sub4.unsubscribe()
  }

  onClickCreate() {
    this.accountService.$showAddAccount.next(true)
    this.accountService.$showAccountList.next(false)
  }

}
