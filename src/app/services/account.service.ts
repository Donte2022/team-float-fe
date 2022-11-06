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

  $account = new BehaviorSubject<IAccount | null>(null)
  $isRegistering = new BehaviorSubject<boolean>(false)
  $loginErrorMessage = new BehaviorSubject<string | null>(null)

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<IAccount> {
    return this.http.get<IAccount>("http://localhost:8080/api/account", {
      params: {username: username, password: password}})
  }

  public createAccount(fname: string, lname: string, email: string, username: string, password: string, rank: number): Observable<IAccount> {
    return this.http.post<IAccount>("http://localhost:8080/api/account", {
      firstname: fname,
      lastname: lname,
      email: email,
      username: username,
      password: password,
      rank: rank
    })
  }

  public updateAccount(fname: string, lname: string, email: string, username: string, password: string, rank: number): Observable<IAccount> {
    const accountId = this.$account.getValue()?.id
    //Todo If admin?
    // if (accountId === 1) {}
    //Todo If shopkeeper?
    // if (accountId === 2) {}
    //Todo If customer
    // if (accountId === 3) {}
      return this.http.put<IAccount>(`http://localhost:8080/api/account/${accountId}`, {
        firstname: fname,
        lastname: lname,
        email: email,
        username: username,
        password: password,
        rank: rank
      })
  }

  public deleteAccount(): Observable<String> {
    const accountId = this.$account.getValue()?.id
    return this.http.delete<String>(`http://localhost:8080/api/account/${accountId}`)
    //Todo logout
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

  public attemptRegister(fname: string, lname: string, email: string, username: string, password: string, rank: number) {
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
    //Todo validation for lname, fname, email
    this.createAccount(fname, lname, email, username, password, rank).pipe(first()).subscribe({
      next: () => this.attemptLogin(username, password),
      error: (err) => {
        if (err.status === 409) {
          this.$loginErrorMessage.next(this.REGISTER_USER_EXISTS_ERROR_MESSAGE)
        } else
          this.$loginErrorMessage.next(this.REGISTER_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public attemptUpdateAccount(fname: string, lname: string, email: string, username: string, password: string, rank: number) {
    if (username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    //Todo validation for lname, fname, email, rank
    this.updateAccount(fname, lname, email, username, password, rank).pipe(first()).subscribe({
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
