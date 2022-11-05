import { Component } from '@angular/core';
import {AccountService} from "./services/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMsg: string | null = null
  isRegistering: boolean = false

  constructor(private accountService: AccountService) {
    accountService.$isRegistering.subscribe(
      isRegistering => this.isRegistering = isRegistering
    )
    accountService.$loginErrorMessage.subscribe(
      errorMsg => this.errorMsg = errorMsg
    )
  }
}
