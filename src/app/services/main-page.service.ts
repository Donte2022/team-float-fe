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

  private fullCategory : ICategory []
  $fullCategory = new Subject<ICategory[]>()
  private fullProduct: IProduct []
  $fullProduct = new Subject<IProduct[]>()

  // Ind variable

  private indCategory : ICategory
  $indCategory = new Subject<ICategory>()
  private indProduct : IProduct
  $indProduct = new Subject<IProduct>()
  private indPrice : IPriceChange
  $indPrice = new Subject<IPriceChange>()

  // Message Subjects

  $mainShoppingpageMessage = new BehaviorSubject<string>("")
  $categoryEditmessage = new BehaviorSubject<string>("")
  $categoryCreatemessage = new BehaviorSubject<string>("")
  $productCreatemessage = new BehaviorSubject<string>("")
  $productEditmessage = new BehaviorSubject<string>("")
  $priceCreatemessage = new BehaviorSubject<string>("")
  $priceChangemessage = new BehaviorSubject<string>("")

  // Screen Subject

  $mainShoppingpageScreen = new Subject<boolean>()
  private mainShoppingpageScreen : boolean = false
  $categoryEditscreen = new Subject<boolean>()
  private categoryEditscreen : boolean = false
  $categoryCreatescreen = new Subject<boolean>()
  private categoryCreatescreen: boolean = false
  $productScreen = new Subject<boolean>()
  private productScreen : boolean = false
  $productCreatescreen = new Subject<boolean>()
  private productCreatescreen : boolean = false
  $productEditscreen = new Subject<boolean>()
  private productEditscreen : boolean = false
  $priceCreatescreen = new Subject<boolean>()
  private priceCreatescreen : boolean = false
  $priceEditscreen = new Subject<boolean>()
  private priceChangescreen : boolean = false


  constructor(private http:HttpService) {
    this.indCategory = {} as ICategory
    this.indProduct = {} as IProduct
    this.indPrice = {} as IPriceChange
    this.fullCategory = []
    this.fullProduct = []
  }

  // Misc Getters and Setters


  getrank(): number {
    return this.rank;
  }


// Ind variables Getters and Setters


  getIndCategory(): ICategory {
    this.$indCategory.next(this.indCategory)
    return this.indCategory;
  }

  setIndCategory(value: ICategory) {
    this.indCategory = {...value};
    this.$indCategory.next(this.indCategory)

  }

  getIndProduct(): IProduct {
    this.$indProduct.next(this.indProduct)
    return this.indProduct;
  }

  setIndProduct(value: IProduct) {
    this.indProduct = {...value};
    this.$indProduct.next(this.indProduct)
  }

  getIndPriceChange(): IPriceChange {
    this.$indPrice.next(this.indPrice)
    return this.indPrice;
  }

  setIndPriceChange(value: IPriceChange) {
    this.indPrice = {...value};
    this.$indPrice.next(this.indPrice)
  }

// Full List Getters and Setters


  getFullCategoryList(): ICategory[] {
    this.$fullCategory.next(this.fullCategory)
    return this.fullCategory;
  }


  getFullProductList(): IProduct[] {
    this.$fullProduct.next(this.fullProduct)
    return this.fullProduct;
  }


// Screen Setters


  setMainShoppingPageScreen(value: boolean) {
    this.mainShoppingpageScreen = value;
    this.$mainShoppingpageScreen.next(this.mainShoppingpageScreen)
  }

  setCategoryEditScreen(value: boolean) {
    this.categoryEditscreen = value;
    this.$categoryEditscreen.next(this.categoryEditscreen)
  }

  setCategoryCreateScreen(value: boolean) {
    this.categoryCreatescreen = value;
    this.$categoryCreatescreen.next(this.categoryCreatescreen)
  }

  setProductScreen(value: boolean) {
    this.productScreen = value;
    this.$productScreen.next(this.productScreen)
  }

  setProductCreateScreen(value: boolean) {
    this.productCreatescreen = value;
    this.$productCreatescreen.next(this.productCreatescreen)
  }

  setProductEditScreen(value: boolean) {
    this.productEditscreen = value;
    this.$productEditscreen.next(this.productEditscreen)
  }

  setPriceChangeCreateScreen(value: boolean) {
    this.priceCreatescreen = value;
    this.$priceCreatescreen.next(this.priceCreatescreen)
  }

  setPriceChangeEditScreen(value: boolean) {
    this.priceChangescreen = value;
    this.$priceEditscreen.next(this.priceChangescreen)
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
    let obs = this.http.get("/product") as Observable<IProduct[]>
    obs.subscribe({
      next: value => {
        this.fullProduct = [...value]
        this.$fullProduct.next(this.fullProduct)
      },
      error: err => {console.error(err)
        this.$mainShoppingpageMessage.next(err.message)}
    })
  }

  getFullCategoryListRequest () {
    let obs = this.http.get("/categories") as Observable<ICategory[]>
    obs.subscribe({
      next: value => {
      this.fullCategory = [...value]
      this.$fullCategory.next(this.fullCategory)},
      error:err => {console.error(err)
        this.$mainShoppingpageMessage.next(err.message)}
    })
  }


  //Post Request

  postProduct (Input : IsimpleProduct) {
    let obs = this.http.post("/product",Input) as  Observable<IProduct>
    obs.subscribe({
      next: value => {
        value.priceChange = []
        value.categories = []
        this.fullProduct.push(value)
        this.$fullProduct.next(this.fullProduct)
      },
      error: err => {console.error(err)
        this.$productCreatescreen.next(err.message)}
    })
  }


  postPriceChange (Input: IsimplePriceChange, proid : IProduct) {
    let obs = this.http.post("/price/" + proid.id,Input) as Observable<IPriceChange>
    obs.subscribe({
      next: value => {
        let num = this.fullProduct.findIndex(value1 => {return value1.id === proid.id})
        this.fullProduct[num].priceChange.push(value)
        this.$fullProduct.next(this.fullProduct)
        this.onpricerequest(proid)
      },
      error: err => {console.error(err)
        this.$priceCreatescreen.next(err.message)}
    })
  }

  postCategory (input: IPostCategory) {
    // let arr: IPostCategory = {name: "red",proidList: [20,40]}
    let obs = this.http.post("/categories",input) as Observable<ICategory>
    obs.subscribe({
      next: value => {
      this.fullCategory.push(value)
      this.$fullCategory.next(this.fullCategory)
      for (let pro of this.fullProduct){
        if (-1 != input.productList.findIndex(value1 => {return value1 == pro.id})){
          pro.categories.push(value)
        }
      }
      },
      error: err => {console.error(err)
        this.$categoryCreatemessage.next(err.message)}
    })
  }

  //Put Request

  putProduct (Input : IProduct){
    let obs = this.http.put("/product",Input)
    obs.subscribe({
      next: () => {
      let num =  this.fullProduct.findIndex(value1 => {return value1.id === Input.id})
        this.fullProduct.splice(num,1,Input)
        this.$fullProduct.next(this.fullProduct)
      },
      error: err => {console.error(err)
        this.$productEditscreen.next(err.message)}
    })
  }

  putPriceChange (input: IPriceChange) {
    let obs = this.http.put("/price/" ,input)
    obs.subscribe({
      next:() => {
        let num = this.fullProduct.findIndex(value1 => {return value1.id === this.indProduct.id})
       let num2 = this.fullProduct[num].priceChange.findIndex(value1 => {return value1.id === input.id})
        this.fullProduct[num].priceChange.splice(num2,1,input)
        this.onpricerequest(this.indProduct)
      },
      error:err => {console.error(err)
        this.$priceChangemessage.next(err.message)}
    })
  }


  putCategory (input : IsimpleCategory, oldlist : number []) {
    let obs = this.http.put("/categories",input)
    obs.subscribe({
      next: () => {
        for (let pro of this.fullProduct){
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
        let val = this.fullCategory.findIndex(value1 => {return value1.id == input.id})
        this.fullCategory[val].name = input.name
        this.$fullCategory.next(this.fullCategory)
      },
      error: err => {console.error(err)
        this.$categoryEditmessage.next(err.message)}
    })
  }
  //Delete Request

  deleteProduct (Input: number) {
    let obs = this.http.del("/product?id="+ Input )
    obs.subscribe({
      next: () => {
        let num = this.fullProduct.findIndex(value1 => {return value1.id === Input})
        this.fullProduct.splice(num,1)
        this.$fullProduct.next(this.fullProduct)
      },
      error: err => {console.error(err)
        this.$mainShoppingpageMessage.next(err.message)}
    })
  }

  deletePriceChange (proid: number, priid: number,pro: IProduct) {
    let obs = this.http.del("/price/" + proid + "/" + priid)
    obs.subscribe({
      next: () => {
        let num = this.fullProduct.findIndex(value1 => {return value1.id === proid})
        let num2 = this.fullProduct[num].priceChange.findIndex(value1 => {return value1.id === priid})
        this.fullProduct[num].priceChange.splice(num2,1)
        this.onpricerequest(pro)
      },
      error: err => {console.error(err)
        this.$mainShoppingpageMessage.next(err.message)}
    })
  }

  deleteCategory (input : number) {
    let obs = this.http.del("/categories/"+input)
    obs.subscribe({
      next: () => {
        for (let pro of this.fullProduct){
       let num =  pro.categories.findIndex(value1 => {return value1.id == input})
          if (num != -1){
            pro.categories.splice(num,1)
          }
        }
       let num2 = this.fullCategory.findIndex(value1 => {return value1.id == input})
        this.fullCategory.splice(num2,1)
        this.$fullCategory.next(this.fullCategory)
        this.$fullProduct.next(this.fullProduct)
      },
      error: err => {console.error(err)
        this.$mainShoppingpageMessage.next(err.message)}
    })
  }

}
