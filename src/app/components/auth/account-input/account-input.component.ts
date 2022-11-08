import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.css']
})
export class AccountInputComponent implements OnInit, OnDestroy {
  @Input() account: IAccount = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    rank: 0
  }

  accountToEditId: number | null = null
  originalRank: number = 0

  sub1: Subscription
  sub2: Subscription

  constructor(private accountService: AccountService) {
      this.sub1 = accountService.$accountIdToEdit.subscribe(
        accountToEditId => this.accountToEditId = accountToEditId
      )
      this.sub2 = accountService.$account.subscribe(account => {
          if (!this.accountToEditId && account !== null)
            this.account = account
      })
  }

  ngOnInit(): void {
    this.originalRank = this.account.rank
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

  onRankChange(event: string){
    this.account.rank = parseInt(event)
  }

  onSave() {
    if (this.account !== null)
      this.accountService.attemptUpdateAccount(this.account)
  }

  onCancel() {
    this.accountService.$showMyAccount.next(false)
    this.accountService.$accountIdToEdit.next(null)
  }

  onDelete() {
    if (this.account !== null )
      this.accountService.attemptDelete(this.account.id)
    else
      console.log("Cannot find account to delete")
      //Todo handle error
  }

}
