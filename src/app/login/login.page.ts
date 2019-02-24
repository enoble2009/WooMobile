import { Component, OnInit, ViewChild } from '@angular/core';
import { WooUserService } from '../woo-user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	error_message: String;

	loginForm: FormGroup;

	constructor(private wooUserService :WooUserService,
		public formBuilder: FormBuilder,
    private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
	}

  ngOnInit() {
  }

	ionViewWillLoad() {
  }

  skipLogin() {
    this.router.navigateByUrl('home');
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }

	login(value) {
		this.wooUserService.login(value.username, value.password)
		.subscribe(res => {
      this.wooUserService.getUserDetails(res.json().token)
        .subscribe(res2 => {
           this.wooUserService.setUser({
             token: res.json().token,
             username: value.username,
             displayname: res.json().user_display_name,
             email: res.json().user_email,
             id: res2.json().id
           });
           this.router.navigateByUrl('home');
         },
         err => {
           this.error_message = "Invalid credentials.";
           console.log(err);
         });
     },
     err => {
       this.error_message = "Invalid credentials.";
       console.log(err);
     });
	}

}
