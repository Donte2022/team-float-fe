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
  }
}
