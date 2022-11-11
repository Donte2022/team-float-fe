import {Component, Input, OnInit} from '@angular/core';
import {IAccount} from "../../../interfaces/IAccount";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account-list-item',
  templateUrl: './account-list-item.component.html',
  styleUrls: ['./account-list-item.component.css']
})
export class AccountListItemComponent implements OnInit {
  @Input() account!: IAccount

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickEdit() {
    this.accountService.$accountIdToEdit.next(this.account.id)
  }

  onClickDelete() {
    this.accountService.attemptDelete(this.account.id)
  }

}
