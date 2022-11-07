import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {IAccount} from "../../../interfaces/IAccount";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickReg(newAccount: IAccount) {
    this.accountService.attemptRegister(newAccount)
  }

  onClickToLogin() {
    this.accountService.$isRegistering.next(false)
  }

}
