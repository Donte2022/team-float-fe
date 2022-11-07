import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickReg(accountInfo: {
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    rank: number
  }) {
    this.accountService.attemptRegister(accountInfo.firstname, accountInfo.lastname, accountInfo.email, accountInfo.username, accountInfo.password, accountInfo.rank)
  }

  onClickToLogin() {
    this.accountService.$isRegistering.next(false)
  }

}
