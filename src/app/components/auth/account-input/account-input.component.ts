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
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    rank: 0
  }

  constructor(private accountService: AccountService) {
    accountService.$account.subscribe(account => {
      if (account !== null) {
        this.account = account
      }
    }
  )
  }

  ngOnInit(): void {}

  onSubmit(firstname: string, lastname: string, email: string, username: string, password: string, rank: number) {
    if (this.account !== null)
      this.accountService.attemptUpdateAccount(firstname, lastname, email, username, password, rank, this.account.id)
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
