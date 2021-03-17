import { NgForm } from '@angular/forms';
import { CategoryRepository } from 'src/app/model/category.repository';
import { Category } from './../../../model/category.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

 
  editing :boolean = false;
  category: Category = new Category();

  constructor(private activeRoute: ActivatedRoute, private repository: CategoryRepository, private router: Router) { 
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    if(this.editing){
      this.category = repository.getCategory(activeRoute.snapshot.params['id']);
    }
  }

  ngOnInit() {
  }
  save(form: NgForm){
    this.repository.saveCategory(this.category);
    this.router.navigateByUrl('/admin/main/categories');
  }
}
