import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IProduct} from "../interfaces/IProduct";
import {ICategory} from "../interfaces/ICategory";
import {IPriceChange} from "../interfaces/IPriceChange";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  //TODO add unsub
  //TODO add endpoint url
  //TODO config Error to send messages

  private rank :number

  // Full List

  private FullCategoryList : ICategory []
  $FullCategoryList = new Subject<ICategory[]>()
  private FullProductList: IProduct []
  $FullProductList = new Subject<IProduct[]>()

  // Ind variable

  private IndCategory : ICategory
  $IndCategory = new Subject<ICategory>()
  private IndProduct : IProduct
  $IndProduct = new Subject<IProduct>()
  private IndPriceChange : IPriceChange
  $IndPriceChange = new Subject<IPriceChange>()

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
    this.IndCategory = {} as ICategory
    this.IndProduct = {} as IProduct
    this.IndPriceChange = {} as IPriceChange
    this.FullCategoryList=[{ID: 0,Name:"Test Cat",OriginalOwnerIDUsername:"Joseph",Products:[{ID:0 ,DisplayName:"jellybean",ProductName:"JellyBean",CategoryID:0,OriginalOwnerUsername:"Joseph",
        Description:"Bean",BasePrice:50,Image:"na",Discontinued:false,AvaliableOnDate:new Date(),Weight:20,MAPPrice: 25,CostToMake:25,PriceChangeRequest:[
          {ID:0,Sale:true,NewPrice:45,StartDate:new Date(),EndDate: new Date(),CouponLeft: 100}
        ]}]}]
    this.FullProductList =[]
  }

  // Ind variables Getters and Setters


  getIndCategory(): ICategory {
    this.$IndCategory.next(this.IndCategory)
    return this.IndCategory;
  }

  setIndCategory(value: ICategory, edit : boolean) {
    this.IndCategory = {...value};
    this.$IndCategory.next(this.IndCategory)

  }

  getIndProduct(): IProduct {
    this.$IndProduct.next(this.IndProduct)
    return this.IndProduct;
  }

  setIndProduct(value: IProduct) {
    this.IndProduct = {...value};
    this.$IndProduct.next(this.IndProduct)
  }

  getIndPriceChange(): IPriceChange {
    this.$IndPriceChange.next(this.IndPriceChange)
    return this.IndPriceChange;
  }

  setIndPriceChange(value: IPriceChange) {
    this.IndPriceChange = {...value};
    this.$IndPriceChange.next(this.IndPriceChange)
  }

// Full List Getters and Setters


  getFullCategoryList(): ICategory[] {
    this.$FullCategoryList.next(this.FullCategoryList)
    return this.FullCategoryList;
  }

  setFullCategoryList(value: ICategory[]) {
    this.FullCategoryList = value;
    this.$FullCategoryList.next(this.FullCategoryList)
  }

  getFullProductList(): IProduct[] {
    this.FullProductList = []
    for (let pro of this.FullCategoryList){
      for (let ind of pro.Products){
        if (-1 === this.FullProductList.findIndex(value => {return value.ID === ind.ID})){
          this.FullProductList.push(ind)
        }
      }
    }
    this.$FullProductList.next(this.FullProductList)
    return this.FullProductList;
  }

  setFullProductList(value: IProduct[]) {
    this.FullProductList = value;
    this.$FullProductList.next(this.FullProductList)
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

  /// Get Request

  getfulllist () {
    let obs = this.http.onget("TODO") as Observable<ICategory[]>
    obs.subscribe({
      next: value => {
        this.FullCategoryList = [...value]
        this.getFullProductList()
      },
      error: err => {console.error(err)}
    })
  }


  //Post Methods

  PostCategoryMethods () {}

  PostProductMethods () {}

  PostPriceChange () {}

  //Put Methods

  PutCategoryMethods() {}

  PutProductMethods () {}

  PutPriceChange () {}

  //Delete Methods

  DeleteCategoryMethods () {}

  DeleteProductMethods () {}

  DeletePriceChangeMethods () {}

  // Push Request

  // Put Request

  // Delete Request

}
