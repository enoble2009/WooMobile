import { Component, OnInit } from '@angular/core';
import { WooUserService } from '../woo-user.service';
import { WooProductsService } from '../woo-products.service';
import { Router } from '@angular/router';
import { CartHandlerService } from '../cart-handler.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-final-confirmation',
  templateUrl: './final-confirmation.page.html',
  styleUrls: ['./final-confirmation.page.scss'],
})
export class FinalConfirmationPage implements OnInit {

	public userInfo: any = {};
  public currentCart: any;

  constructor(private wooUserService: WooUserService,
  		private wooProductsService: WooProductsService,
  		private router: Router,
  		private cartHandler: CartHandlerService) {
		this.currentCart = this.cartHandler.loadCart();
		wooUserService.getUser()
    .then(
      data => {
		  	this.wooUserService.loadUserInfo(data).subscribe(
		      res => {
		      	this.userInfo = {
		      		name: res.json().shipping.first_name,
		      		lastname: res.json().shipping.last_name,
		      		address: res.json().shipping.address_1,
		      		city: res.json().shipping.city,
		      		state: res.json().shipping.state,
		      		postcode: res.json().shipping.postcode,
		      		country: res.json().shipping.country
		      	};
		        console.log(res);
		      },
		      err => {
		        console.log(err);
		      }
		    );
      },
      err => { console.log(err); }
    );
  }

  ngOnInit() {
  }

  finalConfirmation() {
  	this.wooProductsService.confirmBuy(this.userInfo, this.currentCart).subscribe(
		      res => {
		      	console.log(res);
		      },
		      err => {
		        console.log(err);
		      }
		    );
  	this.cartHandler.cleanCart();
  	this.router.navigate(['/buy-success']);
  }

  cancelConfirm() {
  	this.router.navigate(['/list']);
  }

}
