import {Component, OnInit} from '@angular/core';
import {AccountService} from "./services/account.service";
import {IAccount} from "./interfaces/IAccount";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  errorMsg: string | null = null
  isRegistering: boolean = false
  account: IAccount | null = null
  showAddAccount: boolean = false

  constructor(private accountService: AccountService) {
    this.accountService.dummyLogin()
    accountService.$isRegistering.subscribe(
      isRegistering => this.isRegistering = isRegistering
    )
    accountService.$loginErrorMessage.subscribe(
      errorMsg => this.errorMsg = errorMsg
    )
    accountService.$account.subscribe(
      account => this.account = account
    )
    accountService.$showAddAccount.subscribe(
        showAddAccount => this.showAddAccount = showAddAccount
    )
  }
  ngOnInit() {
    console.log("On init")

  }
}
