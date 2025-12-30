import { test, expect } from '@playwright/test';

test.describe('API - Reqres Users', () => {

  test('should get a single user with success', async ({ request }) => {
    const userId = 2;
    const response = await request.get(`users/${userId}`);

    // Verifica se a resposta foi bem-sucedida (status 200)
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    
    // Verifica o conteúdo da resposta
    expect(body.data.id).toBe(userId);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.data).toHaveProperty('first_name', 'Janet');
  });

  test('should create a new user', async ({ request }) => {
    const newUser = {
      name: 'Gemini',
      job: 'Code Assistant',
    };

    const response = await request.post('users', {
      data: newUser,
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body.name).toBe(newUser.name);
    expect(body.job).toBe(newUser.job);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});
