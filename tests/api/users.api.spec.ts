import { test, expect, request as baseRequest } from '@playwright/test';
import { UserService } from '../../services/user.api.service';
import { generateFakeUser } from '../../utils/data.factory';
import { APIRequestContext } from '@playwright/test';

let fakeUser: any;
let apiContext: APIRequestContext;

test.beforeAll(async () => {
  fakeUser = await generateFakeUser();
  apiContext = await baseRequest.newContext();
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test.describe('API - Users', () => {

  test('deve obter um usuário específico com sucesso', async () => {  
    const userService = new UserService(apiContext);

    const createResponse = await userService.createUser({
      nome: fakeUser.name,
      email: fakeUser.email,
      password: fakeUser.password,
      administrador: String(fakeUser.isAdmin),
    });
    let body = await createResponse.json();
    
    let response = await userService.getUserById(body._id);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    body = await response.json();
    
    // Verifica o conteúdo da resposta
    expect(body.email).toBe(fakeUser.email);
    expect(body.nome).toBe(fakeUser.name);
    expect(body.administrador).toBe(String(fakeUser.isAdmin));
  });

  test('deve obter uma lista de usuários', async () => {
    const userService = new UserService(apiContext);
    
    const response = await userService.listUsers();

    // Verifica se a resposta foi bem-sucedida (status 200)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('deve criar um novo usuário', async () => {
    const userService = new UserService(apiContext);
    const newUser = await generateFakeUser();

    const response = await userService.createUser({
      nome: newUser.name,
      email: newUser.email,
      password: newUser.password,
      administrador: String(newUser.isAdmin),
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body).toHaveProperty('_id');
  });
});
