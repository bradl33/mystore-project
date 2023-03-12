import { Component, Input } from '@angular/core';
import { CartItemType } from '../models/CartItemType';
import { ProductType } from '../models/ProductType';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product!: ProductType;
  quantities: string[] = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';
  totalPrice = 0;

  constructor (private cartService: CartService) {}

  onSelectedQuantity(value: string): void {
    this.selectedQuantity = value;
  }

  onAddProductToCart(product: ProductType): void {
    this.product.quantity = this.selectedQuantity
    
    const cartItem: CartItemType = {
      product: product,
      totalPrice: product.price * parseInt(this.selectedQuantity),
    };
    this.cartService.addToCart(cartItem);
    this.onSelectedQuantity('1')
  }
}
