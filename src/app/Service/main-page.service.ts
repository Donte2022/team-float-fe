import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IProduct} from "../Interface/IProduct";
import {ICategory} from "../Interface/ICategory";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  //TODO add unsub
  //TODO add endpoint url
  //TODO config Error to send messages
  private rank :number
  private FullCategoryList : ICategory []
  private FullProductList: IProduct []

  // Message Subjects

  $MainShoppingPageMessage = new BehaviorSubject<string>("")
  $CategoryEditMessage = new BehaviorSubject<string>("")
  $CategoryCreateMessage = new BehaviorSubject<string>("")
  $ProductMessage = new BehaviorSubject<string>("")
  $ProductCreateMessage = new BehaviorSubject<string>("")
  $ProductEditMessage = new BehaviorSubject<string>("")
  $PriceChangeCreateMessage = new BehaviorSubject<string>("")
  $PriceChangeEditMessage = new BehaviorSubject<string>("")

  // Screen Subject

  $MainShoppingPageScreen = new Subject<boolean>()
  private MainShoppingPageScreen : boolean = false
  $CategoryEditScreen = new Subject<boolean>()
  private CategoryEditScreen : boolean = false
  $CategoryCreateScreen = new Subject<boolean>()
  private CategoryCreateScreen: boolean = false
  $ProductScreen = new Subject<boolean>()
  private ProductScreen : boolean = false
  $ProductCreateScreen = new Subject<boolean>()
  private ProductCreateScreen : boolean = false
  $ProductEditScreen = new Subject<boolean>()
  private ProductEditScreen : boolean = false
  $PriceChangeCreateScreen = new Subject<boolean>()
  private PriceChangeCreateScreen : boolean = false
  $PriceChangeEditScreen = new Subject<boolean>()
  private PriceChangeEditScreen : boolean = false


  constructor(private http:HttpService) {
    this.rank = 0
    this.FullCategoryList=[]
    this.FullProductList =[]
  }

  // Screen Setters


  setMainShoppingPageScreen(value: boolean) {
    this.MainShoppingPageScreen = value;
    this.$MainShoppingPageScreen.next(this.MainShoppingPageScreen)
  }

  setCategoryEditScreen(value: boolean) {
    this.CategoryEditScreen = value;
    this.$CategoryEditScreen.next(this.CategoryEditScreen)
  }

  setCategoryCreateScreen(value: boolean) {
    this.CategoryCreateScreen = value;
    this.$CategoryCreateScreen.next(this.CategoryCreateScreen)
  }

  setProductScreen(value: boolean) {
    this.ProductScreen = value;
    this.$ProductScreen.next(this.ProductScreen)
  }

  setProductCreateScreen(value: boolean) {
    this.ProductCreateScreen = value;
    this.$ProductCreateScreen.next(this.ProductCreateScreen)
  }

  setProductEditScreen(value: boolean) {
    this.ProductEditScreen = value;
    this.$ProductEditScreen.next(this.ProductEditScreen)
  }

  setPriceChangeCreateScreen(value: boolean) {
    this.PriceChangeCreateScreen = value;
    this.$PriceChangeCreateScreen.next(this.PriceChangeCreateScreen)
  }

  setPriceChangeEditScreen(value: boolean) {
    this.PriceChangeEditScreen = value;
    this.$PriceChangeEditScreen.next(this.PriceChangeEditScreen)
  }

  getfulllist () {
    let obs = this.http.onget("TODO") as Observable<ICategory[]>
    obs.subscribe({
      next: value => {
        this.FullCategoryList = [...value]
      },
      error: err => {console.error(err)}
    })
  }

  listofProduct () {
    let obs = this.http.onget("TODO") as Observable<IProduct[]>
    obs.subscribe({
      next: value => {
        this.FullProductList = [...value]
      },
      error: err => {console.error(err)}
    })
  }
}
