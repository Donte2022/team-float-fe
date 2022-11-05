import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
  }

  onClickLogin(credentials: {username: string, password: string}) {
    console.log(credentials)
    this.accountService.attemptLogin(credentials.username, credentials.password)
  }

  onClickToReg() {
    this.accountService.$isRegistering.next(true)
  }

}
