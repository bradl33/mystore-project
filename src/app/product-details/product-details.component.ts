import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItemType } from '../models/CartItemType';
import { ProductType } from '../models/ProductType';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit { //might break
  private ngUnsubscribe = new Subject<void>()
  id!: number;
  @Input() product!: ProductType;
  products!: ProductType[]
  quantities: string[] = ['1', '2', '3', '4', '5'];
  selectedQuantity = '1';
  totalPrice = 0;

  constructor (
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
    ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    })
    this.productService.getProductList()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res) => {
        this.products = res
        this.product = this.getProductById(this.id);
      }
    })
  }

  getProductById(id: number): ProductType {
    return this.products.filter((ele) => ele.id === id)[0]
  }

  onSelectedQuantity(value: string): void {
    this.selectedQuantity = value;
  }

  onAddProductToCart(product: ProductType): void {
    const cartItem: CartItemType = {
      product: product,
      totalPrice: product.price * parseInt(this.selectedQuantity),
    };
    this.cartService.addToCart(cartItem);
    this.onSelectedQuantity('1')
  }
}
