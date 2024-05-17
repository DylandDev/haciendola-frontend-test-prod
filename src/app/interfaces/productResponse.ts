import { Product } from './product';

export interface ProductListResponse {
  success: boolean;
  data: Product[];
}
