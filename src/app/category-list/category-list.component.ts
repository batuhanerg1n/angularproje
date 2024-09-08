import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []; // Başlangıçta boş bir dizi
  selectedCategory: Category | null = null; // Başlangıçta null

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  displayAll = true;

  selectCategory(category?: Category) {
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
