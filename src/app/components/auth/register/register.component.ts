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
    fname: string,
    lname: string,
    email: string,
    username: string,
    password: string
    rank: number
  }) {
    console.log(accountInfo)
    this.accountService.attemptRegister(accountInfo.fname, accountInfo.lname, accountInfo.email, accountInfo.username, accountInfo.password, accountInfo.rank)
  }

  onClickToLogin() {
    this.accountService.$isRegistering.next(false)
  }

}
