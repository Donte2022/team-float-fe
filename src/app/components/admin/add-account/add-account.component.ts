import { Component, OnInit } from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickCreate(newAccount: IAccount) {
    console.log(newAccount)
    this.accountService.attemptRegister(newAccount)
  }

  onClickCancel() {
    this.accountService.$showAddAccount.next(false)
  }

}
