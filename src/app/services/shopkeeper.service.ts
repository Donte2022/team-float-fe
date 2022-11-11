import { Injectable } from '@angular/core';
import {BehaviorSubject, first, Observable} from "rxjs";
import {ICoupon} from "../interfaces/ICoupon";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {
  $couponList = new BehaviorSubject<ICoupon[]>([])
  $showCouponList = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  public getAllCoupons(): Observable<ICoupon[]> {
    return this.http.get<ICoupon[]>("http://localhost:8080/api/coupon")
  }

  public deleteCoupon(couponId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/api/coupon/${couponId}`)
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
}
