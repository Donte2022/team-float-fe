import {Component, Input, OnInit} from '@angular/core';
import {ICartProduct} from "../../../interfaces/ICartProduct";
import {IProduct} from "../../../interfaces/IProduct";
import {MainPageService} from "../../../services/main-page.service";
import {ICart} from "../../../interfaces/ICart";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() cartProduct!:ICart

  product!:IProduct;
  imageUrl!: string;
  editing: boolean = false
  localCartProduct!:ICart


  constructor(private mainService : MainPageService, private cartService : CartService) {

  }

  ngOnInit(): void {
    this.product =  this.mainService.getProductById(this.cartProduct.productId)
    this.imageUrl = this.product.imageUrl

  }

  onImageError () {
    console.error( this.product?.imageUrl + " Invaild Image URL")
    this.product.imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
  }

  onEdit() {
      this.editing = true
    this.localCartProduct = structuredClone(this.cartProduct)

  }
  onCancel() {
    this.localCartProduct = this.cartProduct
    this.editing = false
    console.log(this.cartProduct.quantity)
  }
  onUpdate() {
    this.cartProduct = this.localCartProduct
    this.editing = false
    console.log(this.cartProduct.quantity)
    this.cartService.updateFromCart(this.cartProduct)
  }

  removeProduct() {
    if(this.cartProduct.cartId!==undefined)
      this.cartService.removeProduct(this.cartProduct.cartId)
  }


}
