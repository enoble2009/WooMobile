import { Component, OnInit } from '@angular/core';
import { WooUserService } from '../woo-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-userinfo',
  templateUrl: './confirm-userinfo.page.html',
  styleUrls: ['./confirm-userinfo.page.scss'],
})
export class ConfirmUserinfoPage implements OnInit {

	public userInfo: any = {};

  constructor(private wooUserService: WooUserService,
  		private router: Router) {
    wooUserService.getUser()
	    .then(
	      data => {
			  	this.wooUserService.loadUserInfo(data).subscribe(
			      res => {
			      	this.userInfo = {
			      		name: res.json().first_name,
			      		lastname: res.json().last_name,
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
  	this.router.navigate(['/final-confirmation']);
  }

  cancelConfirm() {
		this.router.navigate(['/list']);
  }

}
