import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductListResponse } from '../interfaces/productResponse';
import { Product } from '../interfaces/product';
import { ProductResponse } from '../interfaces/ProductResponse ';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppurl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppurl = environment.endpoint;
    this.myApiUrl = 'api/products';
  }

  getProducts(): Observable<ProductListResponse> {
    return this.http.get<ProductListResponse>(
      `${this.myAppurl}${this.myApiUrl}`
    );
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppurl}${this.myApiUrl}`, product);
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.myAppurl}${this.myApiUrl}/${id}`
    );
  }

  updateProduct(id: number, product: Product): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(
      `${this.myAppurl}${this.myApiUrl}/${id}`,
      product
    );
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppurl}${this.myApiUrl}/${id}`);
  }
}
