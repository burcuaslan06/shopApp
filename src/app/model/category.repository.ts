//restservice üzerinden gerekli metodlar alınıyor
import { RestService } from './rest.service';
import { Category } from './category.model';
import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class CategoryRepository implements OnInit {
    private categories: Category[] = [];

    constructor(private restService: RestService){
        this.restService
            .getCategories()
            .subscribe(categories => this.categories =categories);
    
    }

    ngOnInit() {
        }

    //Tek bir category getiriyor
    getCategory(id: number): Category {
        return this.categories.find(i => i.id == id);
    }

    getCategories(): Category[]{
        return this.categories;
    }
    //category ekleme güncelleme ve silme gibi işlemlerde burada olacak

    saveCategory(category: Category) {
        if (category.id == null || category.id == 0) {
            this.restService.addCategory(category)
                .subscribe(p => this.categories.push(p));
        } else {
            this.restService.updateCategory(category)
                .subscribe(p => {
                    this.categories.splice(this.categories.findIndex(p => p.id == category.id), 1, category);
                })
        }
    }

    deleteCategory(category:Category){
        this.restService.deleteCategory(category)
            .subscribe(p=> this.categories.splice(this.categories.findIndex(p=> p.id ==category.id),1));
    }



}
