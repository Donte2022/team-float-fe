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
  $MainShoppingPageMessage = new BehaviorSubject<string>("")
  $MainShoppingPageMessage = new BehaviorSubject<string>("")
  $MainShoppingPageMessage = new BehaviorSubject<string>("")

  constructor(private http:HttpService) {
    this.rank = 0
  }
}
