import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { WooUserService } from './woo-user.service';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private wooUserService :WooUserService,
    private router: Router
  ) {
    this.initializeApp(wooUserService);
  }

  initializeApp(wooUserService: WooUserService) {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      wooUserService.getUser()
      .then(
        data => {
          wooUserService.validateLogin(data.token)
          .subscribe(
            res => this.router.navigateByUrl('home'),
            err => this.router.navigateByUrl('login')
          )
        },
        err => { this.router.navigateByUrl('login'); }
      );
    });
  }
}
