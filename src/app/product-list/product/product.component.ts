import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product | undefined;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id: string = params["productId"]; // id'nin türünü belirtin
      this.loading = true;
      
      this.productService.getProductById(id).subscribe((result: Product) => { // result'ın türünü belirtin
        this.product = { ...result, id: id }; // Bu satırda id'yi tekrar eklemenize gerek yok, çünkü result zaten id içeriyor.
        this.loading = false;
      });
    });
  }
}
