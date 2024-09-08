import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { HomeComponent } from './home/home.component';
import { ProductCreateComponent } from './products/product-list/product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { AuthComponent } from './auth/auth.component';
import { AdminGuard } from './guards/admin-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/create', component: ProductCreateComponent,canActivate:[AdminGuard]},
  { path: 'categories/create', component: CategoryCreateComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'products/category/:categoryId', component: ProductListComponent},
  { path: 'auth',component:AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
