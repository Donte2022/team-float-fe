import {Component} from '@angular/core';
import {AccountService} from "./services/account.service";
import {IAccount} from "./interfaces/IAccount";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  account: IAccount | null = null

  constructor(private accountService: AccountService) {
    accountService.$account.subscribe(
      account => this.account = account
    )
  }
}
