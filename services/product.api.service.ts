import { APIRequestContext } from "@playwright/test";

export class ProductService {
  constructor(private request: APIRequestContext) {}

  async createProduct(product: {
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
    imagem?: any;
  }, token: string = "") {
    return this.request.post('/produtos', {
      form: {
        nome: product.nome,
        preco: String(product.preco), 
        descricao: product.descricao,
        quantidade: String(product.quantidade),
      },
      headers: {
        'Authorization': token
      }
    });
  }

  async getAllProducts() {
    return this.request.get('/produtos');
  }

  async getProductById(id: string) {
    return this.request.get(`/produtos/${id}`);
  }

  async updateProduct(id: string, product: {
    nome: string;
    preco: number;
    descricao: string;
    quantidade: number;
  }, token: string = "") {
    return this.request.put(`/produtos/${id}`, {
      data: product,
      headers: {
        'Authorization': token
      }
    });
  }

  async deleteProduct(id: string, token: string = "") {
    return this.request.delete(`/produtos/${id}`, {
      headers: {
        'Authorization': token
      }
    });
  }
}
