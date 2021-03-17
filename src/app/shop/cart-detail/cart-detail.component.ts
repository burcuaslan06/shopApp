import { Cart } from './../../model/cart.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  constructor(public cart:Cart) { }

  ngOnInit() {
  }

}