import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  public products: ProductType[] = [];
  private subscriptionProducts: any;
  loading: boolean = false;



  ngOnInit() {
    // this.products = this.productService.getProducts();


    this.subscriptionProducts = this.productService.getProducts()
      .subscribe(
        {
          next: (data) => {
            this.products = data;
            console.log('next');
        },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
      })
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }





  // addToCart(title: string): void {
  //   this.cartService.product-card = title;
  //   this.router.navigate(['/order'], {queryParams: {product-card: title}});
  // }

}
