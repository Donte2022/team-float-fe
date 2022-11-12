import { Injectable } from '@angular/core';
import {BehaviorSubject, first, Observable} from "rxjs";
import {ICoupon} from "../interfaces/ICoupon";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {
  private readonly COUPON_INVALID_CODE_MESSAGE = "Coupon code is required"
  private readonly COUPON_INVALID_USE_LIMIT_MESSAGE = "Use limit must be a number 1 or greater"
  private readonly COUPON_INVALID_AMOUNT_MESSAGE = "Amount cannot be a negative number"
  private readonly COUPON_INVALID_PERCENTAGE = "Percentage must be a number from 0 to 100"
  private readonly COUPON_CODE_NOT_UNIQUE_MESSAGE = "Coupon code already in use"
  private readonly COUPON_HTTP_ERROR_MESSAGE = "Http error"

  private readonly REDEEM_INVALID_COUPON_CODE = "Invalid coupon code"
  private readonly REDEEM_INVALID_COUPON_EXPIRED = "Coupon has expired"
  private readonly REDEEM_INVALID_COUPON_TOO_EARLY = "Cannot redeem coupon until later date"
  private readonly REDEEM_INVALID_COUPON_USE_LIMIT = "Coupon use limit reached"

  $couponCreateErrorMessage = new BehaviorSubject<string | null>(null)
  $couponRedeemErrorMessage = new BehaviorSubject<string | null>(null)
  $couponToEditId = new BehaviorSubject<number | null>(null)
  $couponList = new BehaviorSubject<ICoupon[]>([])
  $validCoupon = new BehaviorSubject<ICoupon | null>(null)
  $showCouponInput = new BehaviorSubject<boolean>(false)
  $showCouponList = new BehaviorSubject<boolean>(false)
  $showShopkeepNav = new BehaviorSubject<boolean>(false)
  $isCreatingCoupon = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  public getAllCoupons(): Observable<ICoupon[]> {
    return this.http.get<ICoupon[]>("http://localhost:8080/api/coupon")
  }

  public deleteCoupon(couponId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/api/coupon/${couponId}`)
  }

  public createCoupon(newCoupon: ICoupon): Observable<ICoupon> {
    const { code, endDate, startDate, amount, percentage, useLimit } = newCoupon
    return this.http.post<ICoupon>("http://localhost:8080/api/coupon", {
      code: code,
      endDate: endDate,
      startDate: startDate,
      amount: amount,
      percentage: percentage,
      useLimit: useLimit
    })
  }

  public updateCoupon(updatedCoupon: ICoupon): Observable<ICoupon> {
    const { id, code, endDate, startDate, amount, percentage, useLimit } = updatedCoupon
    return this.http.put<ICoupon>(`http://localhost:8080/api/coupon/`, {
      id: id,
      code: code,
      endDate: endDate,
      startDate: startDate,
      amount: amount,
      percentage: percentage,
      useLimit: useLimit
    })
  }

  public redeemCoupon(couponCode: string): Observable<ICoupon> {
    return this.http.put<ICoupon>("http://localhost:8080/api/coupon/redeem", {code: couponCode})
  }

  public attemptDelete(couponId: number) {
    this.deleteCoupon(couponId).pipe(first()).subscribe({
      next: () => {
          this.$couponList.next(
            this.$couponList.getValue().filter(acct => acct.id !== couponId)
          )
      },
      error: (err) => {
        console.error(err)
        //Todo handle error
      }
    })
  }

  public attemptCreateCoupon(couponToCreate: ICoupon) {
    this.createCoupon(couponToCreate).pipe(first()).subscribe({
      next: (newCoupon) => {
          this.$couponList.next([...this.$couponList.getValue(), newCoupon])
          this.$showCouponInput.next(false)
          this.$isCreatingCoupon.next(false)
          this.$couponCreateErrorMessage.next(null)
      },
      error: (err) => {
        if (err.status === 409)
          this.$couponCreateErrorMessage.next(this.COUPON_CODE_NOT_UNIQUE_MESSAGE)
        else
          this.$couponCreateErrorMessage.next(this.COUPON_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public attemptUpdateCoupon(updatedCoupon: ICoupon) {
    this.updateCoupon(updatedCoupon).pipe(first()).subscribe({
      next: () => {
        const couponList: ICoupon[] = this.$couponList.getValue()
        couponList.splice(couponList.indexOf(updatedCoupon), 1, updatedCoupon)
        this.$couponList.next(couponList)
        this.$couponToEditId.next(null)
        this.$couponCreateErrorMessage.next(null)
      },
      error: () => {
        this.$couponCreateErrorMessage.next(this.COUPON_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public attemptRedeemCoupon(couponCode: string) {
    this.redeemCoupon(couponCode).pipe(first()).subscribe({
      next: (couponToRedeem) => {
        this.$validCoupon.next(couponToRedeem)
      },
      error: (err) => {
        console.error(err.status)
        console.error(err.message)
        if (err.status === 404) {
          this.$couponRedeemErrorMessage.next(this.REDEEM_INVALID_COUPON_CODE)
          return
        }
        if (err.status === 510) {
          this.$couponRedeemErrorMessage.next(this.REDEEM_INVALID_COUPON_EXPIRED)
          return
        }
        if (err.status === 425) {
          this.$couponRedeemErrorMessage.next(this.REDEEM_INVALID_COUPON_TOO_EARLY)
          return
        }
        if (err.status === 429) {
          this.$couponRedeemErrorMessage.next(this.REDEEM_INVALID_COUPON_USE_LIMIT)
          return
        }
        this.$couponRedeemErrorMessage.next(this.COUPON_HTTP_ERROR_MESSAGE)
      }
    })
  }

  public refreshCouponList() {
    this.getAllCoupons().pipe(first()).subscribe({
      next: (couponList) => {
        this.$couponList.next(couponList)
      },
      error: (err) => {
        console.error(err)
        //Todo handle error
      }
    })
  }

  public createOrUpdate(coupon: ICoupon) {
    if (this.validateCreateCoupon(coupon)) {
      if (coupon.id === 0)
        this.attemptCreateCoupon(coupon)
      else
        this.attemptUpdateCoupon(coupon)
    }
  }


  public validateCreateCoupon(coupon: ICoupon) {
    if (coupon.code.length < 1) {
      this.$couponCreateErrorMessage.next(this.COUPON_INVALID_CODE_MESSAGE)
      return false
    }
    if (coupon.useLimit < 1) {
      this.$couponCreateErrorMessage.next(this.COUPON_INVALID_USE_LIMIT_MESSAGE)
      return false
    }
    if (coupon.percentage < 0 || coupon.percentage > 100) {
      this.$couponCreateErrorMessage.next(this.COUPON_INVALID_PERCENTAGE)
      return false
    }
    if (coupon.amount < 0) {
      this.$couponCreateErrorMessage.next(this.COUPON_INVALID_AMOUNT_MESSAGE)
      return false
    }
    //Todo validation for endDate and startDate
    return true
  }
}
