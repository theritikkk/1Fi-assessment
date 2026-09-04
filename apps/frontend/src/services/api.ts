import { Product } from '../types/product.js';

const API_BASE = import.meta.env.VITE_API_URL || '';

class ApiClient {
  private async request<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok || json.success === false) {
      throw new Error(json.error || `HTTP error! Status: ${response.status}`);
    }

    return json.data as T;
  }

  /**
   * Fetch list of all products
   */
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/api/products');
  }

  /**
   * Fetch a single product by its slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    return this.request<Product>(`/api/products/${slug}`);
  }
}

export const api = new ApiClient();
