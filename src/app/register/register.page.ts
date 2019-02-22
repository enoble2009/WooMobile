import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WooUserService } from '../woo-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
	registerForm: FormGroup;

  constructor(
  	public formBuilder: FormBuilder,
    private router: Router,
    private wooUserService: WooUserService) { 
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
	        Validators.required, Validators.email
	      ])),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    });
  }

  goToLogin() {
  	this.router.navigateByUrl('login');
  }

  ngOnInit() {
  }

  register(value) {
  	var username = 'enoble2009@gmail.com'; // this should be an administrator Username
    var password = 'HU70sF^&Dr1VJe00yUOjgvCb'; // this should be an administrator Password
    //only authenticated administrators can create users
    this.wooUserService.login(username, password)
    .subscribe(
      res => {
		  	var user_data = {
		  		username: value.username,
		      first_name: value.firstName,
		      last_name: value.lastName,
		      email: value.email,
		      password: value.password
		  	};
		  	this.wooUserService.register(user_data, res.json().token)
		  		.subscribe(res => {
		       console.log(res);
		       this.router.navigateByUrl('home');
		     },
		     err => {
		       console.log(err);
		     });
	    },
      err => {
        console.log(err);
      }
	  );
  }

}
