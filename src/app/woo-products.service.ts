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

}
