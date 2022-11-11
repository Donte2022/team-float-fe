import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private accountService: AccountService, private cartService: CartService) {}

  ngOnInit(): void {
  }

  onClickLogin(credentials: {username: string, password: string}) {
    console.log(credentials)
    this.accountService.attemptLogin(credentials.username, credentials.password)
  }

  onClickToReg() {
    this.accountService.$isRegistering.next(true)
  }

  dummyLogin() {
    this.accountService.dummyLogin()
  }

}
