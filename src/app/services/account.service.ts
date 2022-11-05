import { Injectable } from '@angular/core';
import {BehaviorSubject, first, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../interfaces/IAccount";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly LOGIN_INVALID_USERNAME_MESSAGE = "Username is required"
  private readonly LOGIN_INVALID_PASSWORD_MESSAGE = "Password is required"
  private readonly LOGIN_INVALID_CREDENTIALS_MESSAGE = 'Incorrect username or password'
  private readonly LOGIN_HTTP_ERROR_MESSAGE = 'Unable to login at this time'

  private readonly REGISTER_HTTP_ERROR_MESSAGE = 'Unable to register at this time'
  private readonly REGISTER_INVALID_ROLE_MESSAGE = 'Role is required'
  private readonly REGISTER_USER_EXISTS_ERROR_MESSAGE = 'Username already exists'

  $isRegistering = new BehaviorSubject<boolean>(false)
  $loginErrorMessage = new BehaviorSubject<string | null>(null)
  $account = new BehaviorSubject<IAccount | null>(null)

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<IAccount> {
    return this.http.get<IAccount>("http://localhost:8080/api/account", {
      params: {username: username, password: password}})
  }

  public createAccount(name: string, email: string, username: string, password: string, rank: number) {
    return this.http.post<IAccount>("http://localhost:8080/api/account", {
      name: name,
      email: email,
      username: username,
      password: password,
      rank: rank
    })
  }


  public attemptLogin(username: string, password: string) {
    if (username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    this.login(username, password).pipe(first()).subscribe({
      next: (account) => {
        if (account) {
          this.$account.next(account)
        } else
          this.$loginErrorMessage.next(this.LOGIN_INVALID_CREDENTIALS_MESSAGE)
      },
      error: () => this.$loginErrorMessage.next(this.LOGIN_HTTP_ERROR_MESSAGE)
    })
  }

  public attemptRegister(name: string, email: string, username: string, password: string, rank: number) {
    if (username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    if (rank < 1 || rank > 3) {
      this.$loginErrorMessage.next(this.REGISTER_INVALID_ROLE_MESSAGE)
      return
    }
    this.createAccount(name, email, username, password, rank).pipe(first()).subscribe({
      next: () => this.attemptLogin(username, password),
      error: (err) => {
        if (err.status === 409) {
          this.$loginErrorMessage.next(this.REGISTER_USER_EXISTS_ERROR_MESSAGE)
        } else
          this.$loginErrorMessage.next(this.REGISTER_HTTP_ERROR_MESSAGE)
      }
    })
  }
}
