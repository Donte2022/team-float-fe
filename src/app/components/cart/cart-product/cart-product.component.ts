import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() cartChange = new EventEmitter()
  cartId!: number | undefined;

  constructor(private mainService : MainPageService, private cartService : CartService) {

  }

  ngOnInit(): void {
    this.product =  this.mainService.getProductById(this.cartProduct.productId)
    this.cartId = this.cartProduct.cartId
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
  }
  onUpdate() {
    this.cartProduct = this.localCartProduct
    if (this.cartProduct.account!==null) {
    this.editing = false
    this.cartService.updateFromCart(this.cartProduct)} else {
      this.cartService.dummyAccountFromCart(this.cartProduct)
    }
    this.cartChange.emit()
  }

  removeProduct(cartId: number | undefined) {
    if(this.cartProduct.cartId!==undefined){
      this.cartService.removeProduct(this.cartProduct.cartId)
    this.cartChange.emit()}
  }


}
