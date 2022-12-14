import { Injectable } from '@angular/core';
import {BehaviorSubject, first, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IAccount} from "../interfaces/IAccount";
import {ShopkeeperService} from "./shopkeeper.service";

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
  $accountIdToEdit = new BehaviorSubject<number | null>(null)
  $accountList = new BehaviorSubject<IAccount[]>([])
  $isAdmin = new BehaviorSubject<boolean>(false)
  $isRegistering = new BehaviorSubject<boolean>(false)
  $loginErrorMessage = new BehaviorSubject<string | null>(null)
  $showMyAccount = new BehaviorSubject<boolean>(false)
  $showAddAccount = new BehaviorSubject<boolean>(false)
  $showAccountList = new BehaviorSubject<boolean>(false)
  $showLogin = new BehaviorSubject<boolean>(false)
  $showManageAccounts = new BehaviorSubject<boolean>(false)

  //Admin = 1, Shopkeeper = 2, Customer = 3
  userRank: number = 4
  $userRank = new BehaviorSubject<number>(4)
  $loggedIn = new Subject<boolean>();

  dummyUser: any = {
    firstName: "Dummy",
    lastName: "Dumdum",
    email: "dum@dumbmail.com",
    username: "soDumb",
    password: "password",
    rank: 1,
    orderId: 1
  }

  constructor(private http: HttpClient, private shopkeeperService: ShopkeeperService) { }
  public dummyLogin() {
    this.attemptRegister(this.dummyUser)
  }

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
      rank: rank,
      orderId: 1
    })
  }

  public updateAccount(updatedAccount: IAccount): Observable<IAccount> {
    const { firstName, lastName, email, username, password, rank, id, orderId } = updatedAccount
      return this.http.put<IAccount>(`http://localhost:8080/api/account/${id}`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        rank: rank,
        orderId: orderId
      })
  }

  public deleteAccount(accountId: number): Observable<String> {
    return this.http.delete<String>(`http://localhost:8080/api/account/${accountId}`)

  }

  public getAllAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>("http://localhost:8080/api/account/all")
  }

  public attemptDelete(accountId: number) {
    this.deleteAccount(accountId).pipe(first()).subscribe({
      next: () => {
        if (accountId === this.$account.getValue()?.id)
          this.$account.next(null)
        else {
          this.$accountList.next(
            this.$accountList.getValue().filter(acct => acct.id !== accountId)
          )
        }
      },
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
          this.$isRegistering.next(false)
          this.userRank = account.rank
          this.$userRank.next(account.rank)
          if (account.rank === 1) {
            this.refreshAccountList()
          }
          if (account.rank < 3) {
            this.shopkeeperService.refreshCouponList()
          }

          this.$loggedIn.next(true)
          this.$showLogin.next(false)
        }
        else
          this.$loginErrorMessage.next(this.LOGIN_INVALID_CREDENTIALS_MESSAGE)
      },
      error: () => this.$loginErrorMessage.next(this.LOGIN_HTTP_ERROR_MESSAGE)
    })

  }

  public attemptRegister(accountToCreate: IAccount) {
    if (accountToCreate.username.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_USERNAME_MESSAGE)
      return
    }
    if (accountToCreate.password.length < 1) {
      this.$loginErrorMessage.next(this.LOGIN_INVALID_PASSWORD_MESSAGE)
      return
    }
    if (accountToCreate.rank < 1 || accountToCreate.rank > 3) {
      this.$loginErrorMessage.next(this.REGISTER_INVALID_ROLE_MESSAGE)
      return
    }
    //Todo validation for lastName, firstName, email
    this.createAccount(accountToCreate).pipe(first()).subscribe({
      next: (newAccount) => {
        if (this.$isRegistering.getValue())
          this.attemptLogin(accountToCreate.username, accountToCreate.password)
        else {
          this.$accountList.next([...this.$accountList.getValue(), newAccount])
          this.$showAddAccount.next(false)
          this.$showAccountList.next(true)
          this.$loginErrorMessage.next(null)
        }
      },
      error: (err) => {
        if (err.status === 409)
          //Todo remove dummy login code when done
          // this.$loginErrorMessage.next(this.REGISTER_USER_EXISTS_ERROR_MESSAGE)
          this.attemptLogin(this.dummyUser.username, this.dummyUser.password)
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
        if (updatedAccount.id === this.$account.getValue()?.id)
          this.$account.next(updatedAccount)
        this.$showMyAccount.next(false)
        this.$accountIdToEdit.next(null)
      },
      error: (err) => {
        //Todo handle error
        console.error(err)
      }
    })
  }

  public refreshAccountList() {
    if (this.$account.getValue() !== null) {
      this.getAllAccounts().pipe(first()).subscribe({
        next: (accountList) => {
          this.$accountList.next(accountList)
        },
        error: (err) => {
          console.error(err)
          //Todo handle error
        }
      })
    }
    else {
      console.log("Null account")
      //Todo handle error
    }
  }

  public resetAccountState() {
    this.$account.next(null)
    this.$accountList.next([])
    this.$accountIdToEdit.next(null)
    this.$showMyAccount.next(false)
    this.$showAddAccount.next(false)
    this.$showAccountList.next(false)
    this.$isRegistering.next(false)
    this.$loginErrorMessage.next(null)
    this.userRank = 4
    this.$userRank.next(4)
  }
}
