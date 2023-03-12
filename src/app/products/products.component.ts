import { Component, OnInit } from '@angular/core';
import { ProductType } from '../models/ProductType';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void{
    this.productService.getProductList().subscribe(prodData => {
      this.products = prodData;
    })
  }
}
