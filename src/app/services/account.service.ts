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

  public createAccount(newAccount: IAccount): Observable<IAccount> {
    const { firstName, lastName, email, username, password, rank } = newAccount
    return this.http.post<IAccount>("http://localhost:8080/api/account", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
      rank: rank
    })
  }

  public updateAccount(updatedAccount: IAccount): Observable<IAccount> {
    const { firstName, lastName, email, username, password, rank, id } = updatedAccount
    //Todo If admin - automatically pass rank as 1?
    // if (accountId === 1) {}
      return this.http.put<IAccount>(`http://localhost:8080/api/account/${id}`, {
        firstName: firstName,
        lastName: lastName,
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
      next: () => this.$account.next(null),
      error: (err) => {
        console.error(err)
        //Todo handle error
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
        }
        else
          this.$loginErrorMessage.next(this.LOGIN_INVALID_CREDENTIALS_MESSAGE)
      },
      error: () => this.$loginErrorMessage.next(this.LOGIN_HTTP_ERROR_MESSAGE)
    })
  }

  public attemptRegister(newAccount: IAccount) {
    if (newAccount.username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (newAccount.password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    if (newAccount.rank < 1 || newAccount.rank > 3) {
      this.$loginErrorMessage.next(this.REGISTER_INVALID_ROLE_MESSAGE)
      return
    }
    //Todo validation for lastName, firstName, email
    this.createAccount(newAccount).pipe(first()).subscribe({
      next: () => this.attemptLogin(newAccount.username, newAccount.password),
      error: (err) => {
        if (err.status === 409) {
          this.$loginErrorMessage.next(this.REGISTER_USER_EXISTS_ERROR_MESSAGE)
        }
        else
          this.$loginErrorMessage.next(this.REGISTER_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public attemptUpdateAccount(updatedAccount: IAccount) {
    if (updatedAccount.username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    //Todo validation for changing password, lastName, firstName, email, rank
    this.updateAccount(updatedAccount).pipe(first()).subscribe({
      next: () => {
        this.$account.next(updatedAccount)
        //Todo handle rendering of my account component?
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }
}