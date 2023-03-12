
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemType } from '../models/CartItemType';
import { FormDataType } from '../models/FormDataType';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItemType[] = [];
  cartTotal = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems();
      this.cartTotal = this.cartService.getCartAmount();
  }

  onUpdatedQuantity(value: string, cartItem: CartItemType): void {
    cartItem.product.quantity = value;
    cartItem.totalPrice = cartItem.product.price * parseInt(value);
    this.cartService.updateCartItem(cartItem);
    this.cartTotal = this.cartService.getCartAmount();
  }

  onSubmit(value: FormDataType): void {
    this.cartTotal = this.cartService.getCartAmount();
    this.router.navigate([`order-success/amount/$${this.cartTotal}/customer/${value.name}`]);
    this.cartService.clearCart();
  }

  onRemoveCartItem(cartItem: CartItemType): void {
    this.cartService.removeFromCart(cartItem);
    this.cartTotal = this.cartService.getCartAmount();
  }
}
