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

  $couponErrorMessage = new BehaviorSubject<string | null>(null)
  $couponToEditId = new BehaviorSubject<number | null>(null)
  $couponList = new BehaviorSubject<ICoupon[]>([])
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
          this.$couponErrorMessage.next(null)
      },
      error: (err) => {
        if (err.status === 409)
          this.$couponErrorMessage.next(this.COUPON_CODE_NOT_UNIQUE_MESSAGE)
        else
          this.$couponErrorMessage.next(this.COUPON_HTTP_ERROR_MESSAGE)
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
        this.$couponErrorMessage.next(null)
      },
      error: (err) => {
        this.$couponErrorMessage.next(this.COUPON_HTTP_ERROR_MESSAGE)
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
    if (this.validateCoupon(coupon)) {
      if (coupon.id === 0)
        this.attemptCreateCoupon(coupon)
      else
        this.attemptUpdateCoupon(coupon)
    }
  }


  public validateCoupon(coupon: ICoupon) {
    if (coupon.code.length < 1) {
      this.$couponErrorMessage.next(this.COUPON_INVALID_CODE_MESSAGE)
      return false
    }
    if (coupon.useLimit < 1) {
      this.$couponErrorMessage.next(this.COUPON_INVALID_USE_LIMIT_MESSAGE)
      return false
    }
    if (coupon.percentage < 0 || coupon.percentage > 100) {
      this.$couponErrorMessage.next(this.COUPON_INVALID_PERCENTAGE)
      return false
    }
    if (coupon.amount < 0) {
      this.$couponErrorMessage.next(this.COUPON_INVALID_AMOUNT_MESSAGE)
      return false
    }
    //Todo validation for endDate and startDate
    return true
  }
}
