import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  //TODO add unsub
  private rank :number
  $MainShoppingPageMessage = new BehaviorSubject<string>("")
  $CategoryEditMessage = new BehaviorSubject<string>("")
  $CategoryCreateMessage = new BehaviorSubject<string>("")
  $ProductMessage = new BehaviorSubject<string>("")
  $ProductCreateMessage = new BehaviorSubject<string>("")
  $ProductEditMessage = new BehaviorSubject<string>("")
  $PriceChangeCreateMessage = new BehaviorSubject<string>("")
  $PriceChangeEditMessage = new BehaviorSubject<string>("")

  constructor(private http:HttpService) {
    this.rank = 0
  }
}
