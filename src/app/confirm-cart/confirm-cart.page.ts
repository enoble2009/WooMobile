import { Component, OnInit } from '@angular/core';
import { CartHandlerService } from '../cart-handler.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.page.html',
  styleUrls: ['./confirm-cart.page.scss'],
})
export class ConfirmCartPage implements OnInit {

  public cartForm: FormGroup;
  public currentCart: any;
  public showAddCartModal: boolean;
  public product: any;
  public cartTotal: number;

  constructor(private cartHandler: CartHandlerService,
      private router: Router) {
  	this.loadCurrentCart();
    this.cartForm = new FormGroup({
      quantity: new FormControl('', Validators.compose([]))
    });
  }

  ngOnInit() {
  }

  loadCurrentCart() {
  	this.currentCart = this.cartHandler.loadCart();
  }

  cancelCart() {
    this.router.navigate(['/list']);
  }

  confirmCart() {
    this.router.navigate(['/confirm-userinfo']);
  }

  cart(p) {
    this.showAddCartModal = true;
    this.product = p;
  }

  applyCart(values) {
    this.showAddCartModal = false;
    this.product.quantity = !values.quantity? 0: values.quantity;
    this.recalculateTotal();

    if (this.product.quantity == 0) { this.cartHandler.removeProductFromCart(this.product, this.cartTotal); }
    else { this.cartHandler.addProductFromCart(this.product, this.cartTotal); }

    this.product = null;
  }

  recalculateTotal() {
    this.cartTotal = 0;  
    for (var key in this.currentCart.products.length) {
      if (this.currentCart.products[key].quantity > 0) 
      	this.cartTotal += this.currentCart.products[key].quantity * this.currentCart.products[key].price;
    }
  }

}
