import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CartHandlerService {

	public INIT_CART: any = { products: {}, quantity: 0, totalPrice: 0 };
	public currentCart: any;

  constructor(private nativeStorage: NativeStorage) {
  	this.initCart();
  }

  initCart() {
  	this.nativeStorage.getItem('cart').then(
        data => {
        	this.currentCart = data;
        },
        err => { 
        	console.log("Error loading CART. Creating new one.");
        	this.currentCart = this.INIT_CART;
        	this.storeCart();
        }
      );
  }

  storeCart() {
		return this.nativeStorage.setItem('cart', this.currentCart).then(
      () => console.log('Stored CART!'),
      error => console.error('Error storing CART', error)
    );
  }

  loadCart() {
  	return this.currentCart;
  }

  addProductFromCart(product, total) {
  	if (this.currentCart.products[product.id]) {
  		this.currentCart.products[product.id].quantity = product.quantity;
  	} else {
  		this.currentCart.products[product.id] = product;
  		this.currentCart.quantity++;
  	}
		this.currentCart.cartTotal = total;

		this.storeCart();
  }

  removeProductFromCart(product, total) {
  	const index = this.currentCart.products.indexOf(product.id, 0);
		if (index > -1) {
		   this.currentCart.products.splice(index, 1);
		}
		this.currentCart.quantity--;
		this.currentCart.cartTotal = total;

		this.storeCart();
  }

}
