import { Component, OnInit } from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  errMsg: string | null = null

  constructor(private accountService: AccountService) {
    accountService.$loginErrorMessage.subscribe(errMsg => this.errMsg = errMsg)
  }

  ngOnInit(): void {
  }

  onClickCreate(newAccount: IAccount) {
    this.accountService.attemptRegister(newAccount)
  }

  onClickCancel() {
    this.accountService.$showAddAccount.next(false)
  }

}
