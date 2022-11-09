import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { MainShoppingPageComponent } from './components/Mainpage/main-shopping-page/main-shopping-page.component';
import { ProductComponent } from './components/Mainpage/product/product.component';
import { CategoryCreateComponent } from './components/Mainpage/category-create/category-create.component';
import { CategoryEditComponent } from './components/Mainpage/category-edit/category-edit.component';
import { CategoryComponent } from './components/Mainpage/category/category.component';
import { ProductCreateComponent } from './components/Mainpage/product-create/product-create.component';
import { PriceChangeEditComponent } from './components/Mainpage/price-change-edit/price-change-edit.component';
import { ProductEditComponent } from './components/Mainpage/product-edit/product-edit.component';
import { PriceChangeCreateComponent } from './components/Mainpage/price-change-create/price-change-create.component';
import { PriceChangeRequestComponent } from './components/Mainpage/price-change-request/price-change-request.component';
import { MainPageComponent } from './components/Mainpage/main-page/main-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AccountInputComponent } from './components/auth/account-input/account-input.component';
import { AccountListComponent } from './components/admin/account-list/account-list.component';
import { AccountListItemComponent } from './components/admin/account-list-item/account-list-item.component';
import { AddAccountComponent } from './components/admin/add-account/add-account.component';


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
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    AccountInputComponent,
    AccountListComponent,
    AccountListItemComponent,
    AddAccountComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
