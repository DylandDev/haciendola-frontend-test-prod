import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { ProductListResponse } from '../../interfaces/productResponse';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  imports: [CommonModule, FontAwesomeModule, RouterLink, ProgressBarComponent],
})
export class ProductsComponent implements OnInit {
  listProducts: Product[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  loading: boolean = false;

  constructor(
    private _productSerice: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  showDeleteSucess() {
    this.toastr.warning('Se elimino el producto', 'Producto elininado');
  }

  getProducts() {
    this.loading = true;

    this._productSerice.getProducts().subscribe((data: ProductListResponse) => {
      console.log(data);

      this.listProducts = data.data;
      this.loading = false;
    });
  }

  deleteProduct(id: number) {
    this.loading = true;
    this._productSerice.deleteProduct(id).subscribe((data) => {
      this.getProducts(), this.showDeleteSucess();
    });
  }
}
