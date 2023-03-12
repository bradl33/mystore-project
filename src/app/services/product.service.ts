import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductType } from '../models/ProductType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productListUrl = '../../assets/data.json'
  productUrl = '../../assets/data.json/products';

  constructor( private http: HttpClient) { }

  getProductList(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.productListUrl)
  }
}
