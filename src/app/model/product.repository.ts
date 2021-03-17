//restservice üzerinden gerekli metodlar alınıyor
import { RestService } from './rest.service';
import { Product } from './product.model';
import { Injectable, OnInit } from '@angular/core';
import { Category } from './category.model';

@Injectable()
export class ProductRepository implements OnInit {
    private products: Product[] = [];

    constructor(private restService: RestService){
        this.restService
            .getProducts()
            .subscribe(products => this.products =products);

    }

    ngOnInit() {
       }

    //Tek bir ürünü getiriyor
    getProduct(id: number): Product {
        return this.products.find(i => i.id == id);
    }

    getProducts(category: Category =  null): Product[] {
        if(category)
            return this.products.filter(p => p.category == category.name);
        
        else
            return this.products;
    }

    //ürün ekleme güncelleme ve silme gibi işlemlerde burada olacak

   
    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.restService.addProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.restService.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product);
                })
        }
    }

    deleteProduct(product:Product){
        this.restService.deleteProduct(product)
            .subscribe(p=> this.products.splice(this.products.findIndex(p=> p.id ==product.id),1));
    }

}
