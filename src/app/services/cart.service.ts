import { Injectable } from '@angular/core';
import { CartItemType } from '../models/CartItemType';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItemType[] = [];
  amount = 0;

  addToCart(cartItem: CartItemType): void {
    const index: number = this.cartItems.findIndex(item => item.product.id === cartItem.product.id);
    if(index !== -1) {
      const newQuantity: number = parseInt(cartItem.product.quantity, 10);
      const currentQuantity: number = parseInt(this.cartItems[index].product.quantity, 10);
      this.cartItems[index].product.quantity = (currentQuantity + newQuantity).toString();
      this.cartItems[index].totalPrice += cartItem.totalPrice;

      const msg = `Updated ${cartItem.product.name} quantity!`
      alert(msg);
    } else {
      this.cartItems.push(cartItem);
      const msg = `${cartItem.product.name} added to cart!`
      alert(msg);
    }
    this.calculateCartAmount()
  }

  updateCartItem(updatedCartItem: CartItemType): void {
    const index: number = this.cartItems.findIndex(item => item.product === updatedCartItem.product);
    if(index !== -1) {
      this.cartItems[index].product.quantity = updatedCartItem.product.quantity;
      this.cartItems[index].totalPrice = updatedCartItem.totalPrice;
      this.calculateCartAmount();
    }
  }

  removeFromCart(cartItem: CartItemType): void {
    const index: number = this.cartItems.indexOf(cartItem);
    if(index !== -1) {
      this.cartItems.splice(index, 1);
      this.calculateCartAmount();
    }
  }

  getCartItems(): CartItemType[]{
    return this.cartItems;
  }

  calculateCartAmount(): void {
    this.amount = 0;
    for (const cartItem of this.cartItems) {
      this.amount += cartItem.totalPrice;
    }
  }

  getCartAmount(): number {
    return this.amount;
  }

  clearCart(): void {
    this.cartItems = [];
    this.amount = 0;
  }
 }
