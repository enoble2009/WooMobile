import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-success',
  templateUrl: './buy-success.page.html',
  styleUrls: ['./buy-success.page.scss'],
})
export class BuySuccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
  	this.router.navigate(['/home']);
  }

}
