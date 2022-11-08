import { Component } from '@angular/core';
import {AccountService} from "./services/account.service";
import {IAccount} from "./interfaces/IAccount";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMsg: string | null = null
  isRegistering: boolean = false
  account: IAccount | null = null
  accountToEditId: number | null = null
  showMyAccount: boolean = false
  showAddAccount: boolean = false
  isAdmin: boolean = false

  constructor(private accountService: AccountService) {
    accountService.$isRegistering.subscribe(
      isRegistering => this.isRegistering = isRegistering
    )
    accountService.$loginErrorMessage.subscribe(
      errorMsg => this.errorMsg = errorMsg
    )
    accountService.$account.subscribe(
      account => this.account = account
    )
    accountService.$accountIdToEdit.subscribe(
      accountIdToEdit => this.accountToEditId = accountIdToEdit
    )
    accountService.$showMyAccount.subscribe(
        showMyAccount => this.showMyAccount = showMyAccount
    )
    accountService.$showAddAccount.subscribe(
        showAddAccount => this.showAddAccount = showAddAccount
    )
    accountService.$isAdmin.subscribe(
      isAdmin => this.isAdmin = isAdmin
    )
  }

  onClickMyAccount() {
    this.accountService.$accountIdToEdit.next(null)
    this.accountService.$showMyAccount.next(true)
  }

  onClickLogout() {
    this.accountService.$account.next(null)
  }
}
