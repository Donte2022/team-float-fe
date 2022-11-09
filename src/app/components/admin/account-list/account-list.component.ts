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

  sub1: Subscription
  sub2: Subscription

  constructor(private accountService: AccountService) {
    this.sub1 = accountService.$accountList.subscribe(
      accountList => this.accountList = accountList
    )
    this.sub2 = accountService.$accountIdToEdit.subscribe(
      accountToEditId => this.accountToEditId = accountToEditId)
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  onClickBack() {
    this.accountService.$showAccountList.next(false)
  }

  onClickCreate() {
    this.accountService.$showAddAccount.next(true)
  }

}
