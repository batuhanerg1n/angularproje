import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];
  error: string = "";
  model: any = {
    name: "iphone 17",
    price: 20000,
    categoryId: "0"
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  saveProduct(form: NgForm) {

    const extensions = ["jpeg","jpg","png"];
    const extension = this.model.imageUrl.split(".").pop();

    if(extensions.indexOf(extension) == -1) {
      this.error ="resim uzantısı sadece jpeg, jpg, png olmalıdır.";
      return;
    }

    if(this.model.categoryId == "0") {
      this.error ="kategori seçmelisiniz.";
      return;
    }

    const product = { 
      id: 1, 
      name: this.model.name, 
      price: this.model.price, 
      imageUrl: this.model.imageUrl, 
      description: this.model.description, 
      isActive: this.model.isActive, 
      categoryId: this.model.categoryId
    }

    if(form.valid) {
      this.productService.createProduct(product).subscribe(data => {
        this.router.navigate(['/products']);
      });
    } else {
      this.error ="formu kontrol ediniz.";
    }

    console.log(this.model);



  }

}
