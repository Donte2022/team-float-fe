import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { MainShoppingPageComponent } from './Components/Mainpage/main-shopping-page/main-shopping-page.component';
import { ProductComponent } from './Components/Mainpage/product/product.component';
import { CategoryCreateComponent } from './Components/Mainpage/category-create/category-create.component';
import { CategoryEditComponent } from './Components/Mainpage/category-edit/category-edit.component';
import { CategoryComponent } from './Components/Mainpage/category/category.component';
import { ProductCreateComponent } from './Components/Mainpage/product-create/product-create.component';
import { PriceChangeEditComponent } from './Components/Mainpage/price-change-edit/price-change-edit.component';
import { ProductEditComponent } from './Components/Mainpage/product-edit/product-edit.component';
import { PriceChangeCreateComponent } from './Components/Mainpage/price-change-create/price-change-create.component';
import { PriceChangeRequestComponent } from './Components/Mainpage/price-change-request/price-change-request.component';
import { MainPageComponent } from './Components/Mainpage/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainShoppingPageComponent,
    ProductComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryComponent,
    ProductCreateComponent,
    PriceChangeEditComponent,
    ProductEditComponent,
    PriceChangeCreateComponent,
    PriceChangeRequestComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
