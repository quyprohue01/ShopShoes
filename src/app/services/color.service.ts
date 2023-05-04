import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  cartItems = new BehaviorSubject<Product[]>([]);
  cartData = new EventEmitter<Product[] | []>();
  cartPay = new EventEmitter<Product[] | []>();
  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getProduct(): Observable<any> {
    return this.http.get('https://64488ed3b88a78a8f0ef2838.mockapi.io/products');
  }

  getId(id: any): Observable<any> {
    return this.http.get('https://64488ed3b88a78a8f0ef2838.mockapi.io/products/' + id);
  }

  postToCart(data: Product): Observable<any> {
    return this.http.post('https://64488ed3b88a78a8f0ef2838.mockapi.io/cart', data).pipe(
      tap(() => {
        const currentCartItems = this.cartItems.value;
        const newCartItems = [...currentCartItems, data];
        this.cartItems.next(newCartItems);
      })
    );
  }
  postToPay(data: Product): Observable<any> {
    return this.http.post('https://64488ed3b88a78a8f0ef2838.mockapi.io/cart', data).pipe(
      tap(() => {
        const currentCartItems = this.cartItems.value;
        const newCartItems = [...currentCartItems, data];
        this.cartItems.next(newCartItems);
      })
    );
  }
  getCartItems(idUser:number): Observable<any> {
    return this.http.get(`https://64488ed3b88a78a8f0ef2838.mockapi.io/cart?idUser=${idUser}`);
  }
  deleteCartItem(id: number): Observable<any> {
    return this.http.delete('https://64488ed3b88a78a8f0ef2838.mockapi.io/cart/' + id).pipe(
      tap(() => {
        const currentCartItems = this.cartItems.value;
        const newCartItems = currentCartItems.filter(item => item.id !== id);
        this.cartItems.next(newCartItems);
      })
    );
  }
  localAddToCart(data: Product) {
    let cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartData = Array.isArray(cartData) ? cartData.concat(data) : [cartData, data];
    localStorage.setItem('cartItems', JSON.stringify(cartData));
    this.cartData.emit(cartData);
  }
  localAddToPay(data: Product) {
    let cartPay = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartPay = Array.isArray(cartPay) ? cartPay.concat(data) : [cartPay, data];
    localStorage.setItem('cartItems', JSON.stringify(cartPay));
    this.cartPay.emit(cartPay);
  }
}
