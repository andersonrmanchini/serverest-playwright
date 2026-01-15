import { test, expect, request as baseRequest } from '@playwright/test';
import { APIRequestContext } from '@playwright/test';
import { ProductService } from '../../services/product.api.service';
import { LoginService } from '../../services/login.api.service';
import { UserService } from '../../services/user.api.service';
import { generateFakeProduct } from '../../utils/data.factory';
import { generateFakeUser } from '../../utils/data.factory';
import fs from 'fs';

let userService: UserService;
let productService: ProductService;
let loginService: LoginService;
let user: any;
let product: any;
let apiContext: APIRequestContext;
let token: string;

test.beforeAll(async () => {
  apiContext = await baseRequest.newContext();
  userService = new UserService(apiContext);
  productService = new ProductService(apiContext);
  loginService = new LoginService(apiContext);
  
  // Cria um usuário administrador para autenticação
  const userFake = await generateFakeUser();
  const createUserResponse = await userService.createUser({
    nome: userFake.name,
    email: userFake.email,
    password: userFake.password,
    administrador: String(userFake.isAdmin),
  });
  user = await createUserResponse.json();

  // Autentica o usuário para obter o token
  const loginResponse = await (await loginService.loginUser({
    email: userFake.email,
    password: userFake.password,
  })).json();
  token = loginResponse.authorization;

  // Cria um produto para os testes
  const productFake = await generateFakeProduct();
  const imageBuffer = fs.readFileSync(productFake.image);
  const productCreateResponse = await productService.createProduct({
    nome: productFake.name,
    preco: productFake.price,
    descricao: productFake.description,
    quantidade: productFake.quantity,
    imagem: imageBuffer,
  }, token);
  const productCreateData = await productCreateResponse.json();
  
  // Faz um GET para obter os dados completos do produto criado
  const productGetResponse = await productService.getProductById(productCreateData._id);
  product = await productGetResponse.json();
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('API - Produtos', () => {
  test('deve obter uma lista de produtos', async () => {
    const response = await productService.getAllProducts();

    expect(response.status()).toBe(200);
  });

  test('deve criar um novo produto', async () => {
    const newProduct = await generateFakeProduct();
    const imageBuffer = fs.readFileSync(newProduct.image);
    const response = await productService.createProduct({
      nome: newProduct.name,
      preco: newProduct.price,
      descricao: newProduct.description,
      quantidade: newProduct.quantity,
      imagem: imageBuffer,
    }, token);
    const body = await response.json();
    
    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body).toHaveProperty('_id');
  });

  test('deve obter um produto específico com sucesso', async () => {
    let response = await productService.getProductById(product._id);
    let body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.nome).toBe(product.nome);
    expect(body.preco).toBe(product.preco);
    expect(body.descricao).toBe(product.descricao);
    expect(body.quantidade).toBe(product.quantidade);
  });

  test('deve atualizar um produto com sucesso', async () => {
    const updatedProduct = await generateFakeProduct();
    let response = await productService.updateProduct(product._id, {
      nome: updatedProduct.name,
      preco: updatedProduct.price,
      descricao: updatedProduct.description,
      quantidade: updatedProduct.quantity,
    }, token);
    const updatedBody = await response.json();

    expect(response.status()).toBe(200);
    expect(updatedBody.message).toBe('Registro alterado com sucesso');
  });

  test('deve deletar um produto com sucesso', async () => {
    let response = await productService.deleteProduct(product._id, token);
    const deletedBody = await response.json();

    expect(response.status()).toBe(200);
    expect(deletedBody.message).toBe('Registro excluído com sucesso');
  });
});
