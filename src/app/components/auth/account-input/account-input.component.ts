import { Component, OnInit } from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.css']
})
export class AccountInputComponent implements OnInit {
  account!: IAccount | null

  constructor(private accountService: AccountService) {
    accountService.$account.subscribe(account => this.account = account)
  }

  ngOnInit(): void {
  }

  onSubmit(account: {fname: string, lname: string, email: string, username: string, password: string, rank: number}) {
    const {fname, lname, email, username, password, rank} = account
    this.accountService.attemptUpdateAccount(fname, lname, email, username, password, rank)
  }

  onCancel() {

  }

  onDelete() {
    this.accountService.deleteAccount()
  }

}
