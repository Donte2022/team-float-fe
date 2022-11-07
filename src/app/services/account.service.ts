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

  $account = new BehaviorSubject<IAccount |  null>(null)
  $isRegistering = new BehaviorSubject<boolean>(false)
  $loginErrorMessage = new BehaviorSubject<string | null>(null)

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<IAccount> {
    return this.http.get<IAccount>("http://localhost:8080/api/account", {
      params: {username: username, password: password}})
  }

  public createAccount(firstname: string, lastname: string, email: string, username: string, password: string, rank: number): Observable<IAccount> {
    return this.http.post<IAccount>("http://localhost:8080/api/account", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
      rank: rank
    })
  }

  public updateAccount(firstname: string, lastname: string, email: string, username: string, password: string, rank: number, accountId: number): Observable<IAccount> {
    //Todo If admin - automatically pass rank as 1?
    // if (accountId === 1) {}
      return this.http.put<IAccount>(`http://localhost:8080/api/account/${accountId}`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        rank: rank
      })
  }

  public deleteAccount(accountId: number): Observable<String> {
    return this.http.delete<String>(`http://localhost:8080/api/account/${accountId}`)

  }

  public attemptDelete(accountId: number) {
    this.deleteAccount(accountId).pipe(first()).subscribe({
      next: (res) => {
        console.log(res)
        this.$account.next(null)
      },
      error: (err) => {
        console.error(err)
      }
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
          this.$loginErrorMessage.next(null)
        } else
          this.$loginErrorMessage.next(this.LOGIN_INVALID_CREDENTIALS_MESSAGE)
      },
      error: () => this.$loginErrorMessage.next(this.LOGIN_HTTP_ERROR_MESSAGE)
    })
  }

  public attemptRegister(firstname: string, lastname: string, email: string, username: string, password: string, rank: number) {
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
    //Todo validation for lastname, firstname, email
    this.createAccount(firstname, lastname, email, username, password, rank).pipe(first()).subscribe({
      next: () => this.attemptLogin(username, password),
      error: (err) => {
        if (err.status === 409) {
          this.$loginErrorMessage.next(this.REGISTER_USER_EXISTS_ERROR_MESSAGE)
        } else
          this.$loginErrorMessage.next(this.REGISTER_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public attemptUpdateAccount(firstname: string, lastname: string, email: string, username: string, password: string, rank: number, id: number) {
    if (username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    //Todo validation for lastname, firstname, email, rank
    this.updateAccount(firstname, lastname, email, username, password, rank, id).pipe(first()).subscribe({
      next: (account) => {
        this.$account.next(account)
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }
}
