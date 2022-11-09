import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {IProduct} from "../interfaces/IProduct";
import {ICategory} from "../interfaces/ICategory";
import {IPriceChange} from "../interfaces/IPriceChange";
import {IsimpleProduct} from "../interfaces/IsimpleProduct";
import {IsimplePriceChange} from "../interfaces/IsimplePriceChange";
import {IPostCategory} from "../interfaces/IPostCategory";
import {IsimpleCategory} from "../interfaces/IsimpleCategory";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private rank :number = 3
  $displayprice = new Subject<{num:number,proid:number}>()

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
    this.IndCategory = {} as ICategory
    this.IndProduct = {} as IProduct
    this.IndPriceChange = {} as IPriceChange
    this.FullCategoryList = []
    this.FullProductList = []
  }

  // Misc Getters and Setters


  getrank(): number {
    return this.rank;
  }


// Ind variables Getters and Setters


  getIndCategory(): ICategory {
    this.$IndCategory.next(this.IndCategory)
    return this.IndCategory;
  }

  setIndCategory(value: ICategory) {
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


  getFullProductList(): IProduct[] {
    this.$FullProductList.next(this.FullProductList)
    return this.FullProductList;
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


  /// Logic

  public onpricerequest (Pro : IProduct):{num:number,proid:number}{
    let num : number  = Pro.price
      for (let pri of Pro.priceChange) {
        if (new Date() > new Date(pri.startDate) && new Date() < new Date(pri.endDate)) {
          num = pri.newPrice
        }
      }
      this.$displayprice.next({num:num,proid:Pro.id})
    return {num:num,proid:Pro.id}
  }

  /// Get Request


  getFullProductListRequest () {
    let obs = this.http.onget("/product") as Observable<IProduct[]>
    obs.subscribe({
      next: value => {
        this.FullProductList = [...value]
        this.$FullProductList.next(this.FullProductList)
      },
      error: err => {console.error(err)
        this.$MainShoppingPageMessage.next(err.message)}
    })
  }

  getFullCategoryListRequest () {
    let obs = this.http.onget("/categories") as Observable<ICategory[]>
    obs.subscribe({
      next: value => {
      this.FullCategoryList = [...value]
      this.$FullCategoryList.next(this.FullCategoryList)},
      error:err => {console.error(err)
        this.$MainShoppingPageMessage.next(err.message)}
    })
  }


  //Post Request

  postProduct (Input : IsimpleProduct) {
    let obs = this.http.onpost("/product",Input) as  Observable<IProduct>
    obs.subscribe({
      next: value => {
        value.priceChange = []
        value.categories = []
        this.FullProductList.push(value)
        this.$FullProductList.next(this.FullProductList)
      },
      error: err => {console.error(err)
        this.$ProductCreateScreen.next(err.message)}
    })
  }


  postPriceChange (Input: IsimplePriceChange, proid : IProduct) {
    let obs = this.http.onpost("/price/" + proid.id,Input) as Observable<IPriceChange>
    obs.subscribe({
      next: value => {
        let num = this.FullProductList.findIndex(value1 => {return value1.id === proid.id})
        this.FullProductList[num].priceChange.push(value)
        this.$FullProductList.next(this.FullProductList)
        this.onpricerequest(proid)
      },
      error: err => {console.error(err)
        this.$PriceChangeCreateScreen.next(err.message)}
    })
  }

  postCategory (input: IPostCategory) {
    // let arr: IPostCategory = {name: "red",proidList: [20,40]}
    let obs = this.http.onpost("/categories",input) as Observable<ICategory>
    obs.subscribe({
      next: value => {
      this.FullCategoryList.push(value)
      this.$FullCategoryList.next(this.FullCategoryList)
      for (let pro of this.FullProductList){
        if (-1 != input.productList.findIndex(value1 => {return value1 == pro.id})){
          pro.categories.push(value)
        }
      }
      },
      error: err => {console.error(err)
        this.$CategoryCreateMessage.next(err.message)}
    })
  }

  //Put Request

  putProduct (Input : IProduct){
    let obs = this.http.onput("/product",Input)
    obs.subscribe({
      next: () => {
      let num =  this.FullProductList.findIndex(value1 => {return value1.id === Input.id})
        this.FullProductList.splice(num,1,Input)
        this.$FullProductList.next(this.FullProductList)
      },
      error: err => {console.error(err)
        this.$ProductEditScreen.next(err.message)}
    })
  }

  putPriceChange (input: IPriceChange) {
    let obs = this.http.onput("/price/" ,input)
    obs.subscribe({
      next:() => {
        let num = this.FullProductList.findIndex(value1 => {return value1.id === this.IndProduct.id})
       let num2 = this.FullProductList[num].priceChange.findIndex(value1 => {return value1.id === input.id})
        this.FullProductList[num].priceChange.splice(num2,1,input)
        this.onpricerequest(this.IndProduct)
      },
      error:err => {console.error(err)
        this.$PriceChangeEditMessage.next(err.message)}
    })
  }


  putCategory (input : IsimpleCategory, oldlist : number []) {
    let obs = this.http.onput("/categories",input)
    obs.subscribe({
      next: () => {
        for (let pro of this.FullProductList){
          let num = input.productList.findIndex(value1 => {return value1 == pro.id})
          let num2 = oldlist.findIndex(value1 => {return value1 == pro.id})
          if (num != -1) {
            let num3 = pro.categories.findIndex(value1 => {return value1.id == input.id})
            if (num3 != -1) {
            pro.categories[num3].name = input.name}
            if (num3 == -1){
              pro.categories.push({id: input.id,name: input.name})
            }
          }
          if (num2 != -1){
            pro.categories.splice(num2,1)
          }
        }
        let val = this.FullCategoryList.findIndex(value1 => {return value1.id == input.id})
        this.FullCategoryList[val].name = input.name
        this.$FullCategoryList.next(this.FullCategoryList)
      },
      error: err => {console.error(err)
        this.$CategoryEditMessage.next(err.message)}
    })
  }
  //Delete Request

  deleteProduct (Input: number) {
    let obs = this.http.ondelete("/product?id="+ Input )
    obs.subscribe({
      next: () => {
        let num = this.FullProductList.findIndex(value1 => {return value1.id === Input})
        this.FullProductList.splice(num,1)
        this.$FullProductList.next(this.FullProductList)
      },
      error: err => {console.error(err)
        this.$MainShoppingPageMessage.next(err.message)}
    })
  }

  deletePriceChange (proid: number, priid: number,pro: IProduct) {
    let obs = this.http.ondelete("/price/" + proid + "/" + priid)
    obs.subscribe({
      next: () => {
        let num = this.FullProductList.findIndex(value1 => {return value1.id === proid})
        let num2 = this.FullProductList[num].priceChange.findIndex(value1 => {return value1.id === priid})
        this.FullProductList[num].priceChange.splice(num2,1)
        this.onpricerequest(pro)
      },
      error: err => {console.error(err)
        this.$MainShoppingPageMessage.next(err.message)}
    })
  }

  deleteCategory (input : number) {
    let obs = this.http.ondelete("/categories/"+input)
    obs.subscribe({
      next: () => {
        for (let pro of this.FullProductList){
       let num =  pro.categories.findIndex(value1 => {return value1.id == input})
          if (num != -1){
            pro.categories.splice(num,1)
          }
        }
       let num2 = this.FullCategoryList.findIndex(value1 => {return value1.id == input})
        this.FullCategoryList.splice(num2,1)
        this.$FullCategoryList.next(this.FullCategoryList)
        this.$FullProductList.next(this.FullProductList)
      },
      error: err => {console.error(err)
        this.$MainShoppingPageMessage.next(err.message)}
    })
  }

}
