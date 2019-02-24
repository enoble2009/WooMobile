import { Component, OnInit } from '@angular/core';
import { WooProductsService } from '../woo-products.service';
import { ModalController } from '@ionic/angular';

import { AddCartComponent } from '../modals/add-cart/add-cart.component';
import { OverlayEventDetail } from '@ionic/core'; 
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CartHandlerService } from '../cart-handler.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ id: number; name: string; slug: string; image: string; quantity: number; price: number; categories: any; showFlag: boolean }> = [];
  public categories: Array<{ id: number; name: string; slug: string }> = [];
  public showAddCartModal: boolean;
  public product: any;
  public cartForm: FormGroup;
  public cartTotal: number;

  constructor(private wooProductsService: WooProductsService,
      private modalController: ModalController,
      private router: Router,
      private cartHandler: CartHandlerService) {
    this.loadProducts();
    this.showAddCartModal = false;
    this.cartForm = new FormGroup({
      quantity: new FormControl('', Validators.compose([]))
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }

  loadProducts() {
    const addedCategories = new Set();
    this.wooProductsService.getProducts().subscribe(
      res => {
        var currentCart = this.cartHandler.loadCart();
        this.items.splice(0);
        for (var i = 0; i < res.json().length; i++) {
          const cats = new Set();
          var obj = res.json()[i];
          for (var j = 0; j < obj.categories.length; j++) {
            cats.add(obj.categories[j].id);
            if (!addedCategories.has(obj.categories[j].id)) {
              addedCategories.add(obj.categories[j].id);
              this.categories.push({ id: obj.categories[j].id, name: obj.categories[j].name, slug: obj.categories[j].slug });
            }
          }
          this.items.push({
            id: obj.id, name: obj.name, slug: obj.slug, 
            image: obj.images.length == 0? "": obj.images[0].src, 
            quantity: currentCart && currentCart.products[obj.id]? currentCart.products[obj.id].quantity: 0, price: obj.price, categories: cats,
            showFlag: true
          });
        }
        this.recalculateTotal();
      },
      err => {
        console.log(err);
      }
    );
  }

  get filterByShowFlag() {
    return this.items.filter( x => x.showFlag );
  }

  updateCategories(cat) {
    if (!cat) {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].showFlag = true;
      }
    } else {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].showFlag = this.items[i].categories.has(cat.id);
      }
    }
  }

  confirmCart() {
    var cart = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].quantity > 0) cart.push(this.items[i]);
    }
    this.router.navigate(['/confirm-cart']);
  }

  cart(p) {
    this.showAddCartModal = true;
    this.product = p;
    console.log(p);
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
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].quantity > 0) this.cartTotal += this.items[i].quantity * this.items[i].price;
    }
  }

  cancelCart() {
    this.showAddCartModal = false;
    this.product = null;
  }

}
