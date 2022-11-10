import {Component, OnInit} from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.css']
})
export class AccountInputComponent implements OnInit {
  account: IAccount = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rank: 0,
    orderId: 1
  }

  constructor(private accountService: AccountService) {
    accountService.$account.subscribe(account => {
      if (account !== null)
        this.account = account
    })
  }

  ngOnInit(): void {}

  onSave() {
    if (this.account !== null)
      this.accountService.attemptUpdateAccount(this.account)
  }

  onCancel() {
    //Todo handle cancel
  }

  onDelete() {
    if (this.account !== null )
      this.accountService.attemptDelete(this.account.id)
    else
      console.log("Cannot find account to delete")
      //Todo handle error
  }

}
