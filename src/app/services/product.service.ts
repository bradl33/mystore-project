import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductType } from '../models/ProductType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListUrl = 'http://localhost:4200/assets/data.json'
  productUrl = 'http://localhost:4200/assets/data.json/products';

  constructor( private http: HttpClient) { }

  getProductList(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.productListUrl)
  }
}
