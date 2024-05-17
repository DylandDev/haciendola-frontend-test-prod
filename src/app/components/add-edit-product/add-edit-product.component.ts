import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ProductResponse } from '../../interfaces/ProductResponse ';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
    ProgressBarComponent,
  ],
})
export class AddEditProductComponent implements OnInit {
  formProduct: FormGroup;
  loading: boolean = false;
  id: number;
  op: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.formProduct = this.fb.group({
      handle: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      sku: ['', Validators.required],
      grams: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      stock: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      price: [null, [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      comparePrice: [
        null,
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
      ],
      barcode: ['', Validators.required],
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    console.log(this.id);
  }
  ngOnInit(): void {
    if (this.id != 0) {
      this.op = 'Editar ';
      this.getProduct(this.id);
    }
  }

  showCreateSucess() {
    this.toastr.success('Se creo un nuevo producto', 'Nuevo producto creado');
  }
  showUpdateSucess(title: string) {
    this.toastr.success(
      `Se actualizo el producto ${title}`,
      'Producto actualizado'
    );
  }

  showErr() {
    this.toastr.error(
      'No se puedo crear un nuevo producto',
      'Error al crear producto'
    );
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: ProductResponse) => {
      const product: Product = data.data;

      this.loading = false;
      this.formProduct.setValue({
        handle: product.handle,
        title: product.title,
        description: product.description,
        sku: product.sku,
        grams: product.grams,
        stock: product.stock,
        price: product.price,
        comparePrice: product.comparePrice,
        barcode: product.barcode,
      });
    });
  }

  addProduct() {
    const product: Product = {
      handle: this.formProduct.value.handle,
      title: this.formProduct.value.title,
      description: this.formProduct.value.description,
      sku: this.formProduct.value.sku,
      grams: parseFloat(this.formProduct.value.grams),
      stock: parseInt(this.formProduct.value.stock),
      price: parseFloat(this.formProduct.value.price),
      comparePrice: parseFloat(this.formProduct.value.comparePrice),
      barcode: this.formProduct.value.barcode,
    };

    this.loading = true;

    if (this.id != 0) {
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe({
        next: () => {
          this.showUpdateSucess(product.title);
          this.loading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.showErr();
          this.loading = false;
        },
      });
    } else {
      this._productService.createProduct(product).subscribe({
        next: () => {
          this.showCreateSucess();
          this.loading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.showErr();
          this.loading = false;
        },
      });
    }
  }
}
