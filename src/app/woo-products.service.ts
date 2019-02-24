import { Injectable } from '@angular/core';
import { WooService } from './woo.service';
import { environment } from '../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Http, Headers } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class WooProductsService {

  constructor(private wooService: WooService, 
    private nativeStorage: NativeStorage, 
    private http: Http,
    private oauthService: OAuthService) {
  }

  getProducts() {
  	let header : Headers = new Headers();

    return this.http.get(
    	environment.woocommerceUrl + 'get-products',
      {headers: header});
  }

  confirmBuy(u, c) {
    let header : Headers = new Headers();

    var order = {
      set_paid: false,
      billing: {
        first_name: u.name,
        last_name: u.lastname,
        address_1: u.address,
        address_2: '',
        city: u.city,
        state: u.state,
        postcode: u.postcode,
        country: u.country,
        email: u.email,
        phone: u.phone
      },
      shipping: {
        first_name: u.name,
        last_name: u.lastname,
        address_1: u.address,
        address_2: '',
        city: u.city,
        state: u.state,
        postcode: u.postcode,
        country: u.country
      },
      line_items: [],
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: 10
        }
      ],
      customer_id: u.id
    };
    for (var key in c.products) {
      order.line_items.push({ product_id: c.products[key].id, quantity: Number(c.products[key].quantity) });
    }

    return this.http.post(
      environment.woocommerceUrl + 'create-order',
      order, {headers: header});
  }

}
