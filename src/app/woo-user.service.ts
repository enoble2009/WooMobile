import { Injectable } from '@angular/core';
import { WooService } from './woo.service';
import { environment } from '../environments/environment';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class WooUserService {

  constructor(private wooService: WooService, 
    private nativeStorage: NativeStorage, 
    private http: Http) { }

  login(user: String, pass: String) {
  	return this.http.post(environment.wordpressUrl + 'wp-json/jwt-auth/v1/token',{
	    username: user,
	    password: pass
	  });
  }

  register(user_data, token){
    let header : Headers = new Headers();
    header.append('Authorization','Bearer ' + token);
    return this.http.post(environment.wordpressApiUrl + 'users', user_data, {headers: header});
  }

  setUser(user) {
    return this.nativeStorage.setItem('loginUser', user).then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }

  getUser(){
    return this.nativeStorage.getItem('loginUser');
  }

  validateLogin(token) {
    let header : Headers = new Headers();
    header.append('Authorization','Bearer ' + token);

    return this.http.post(environment.wordpressUrl 
        + 'wp-json/jwt-auth/v1/token/validate?token=' 
        + token,
      {}, {headers: header});
  }

  loadUserInfo(user) {
    return this.http.get(
      environment.woocommerceUrl + 'customers/' + user.email);
  }

  logout(){
    return this.nativeStorage.clear();
  }

}
